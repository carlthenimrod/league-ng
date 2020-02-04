import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { League, GameGroup } from '@app/models/league';
import { Game } from '@app/models/game';
import { Place, Location } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'app-admin-modal-add-game',
  templateUrl: './admin-modal-add-game.component.html',
  styleUrls: ['./admin-modal-add-game.component.scss']
})
export class AdminModalAddGameComponent implements OnInit {
  league: League;
  game: Game;
  gameForm = this.fb.group({
    home: this.fb.group({
      team: ['', Validators.required],
      score: ['']
    }),
    away: this.fb.group({
      team: ['', Validators.required],
      score: ['']
    }),
    start: [''],
    time: [''],
    place: ['']
  });
  places: Place[];
  showPlaces = false;
  locations: Location[];
  showLocations = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, game?: Game },
    private dialogRef: MatDialogRef<AdminModalAddGameComponent>,
    private fb: FormBuilder,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

    // get all places
    this.placeService.get$().subscribe(places => {
      this.places = places;

      // check if existing game was also provided
      if (this.data.game) {
        this.game = this.data.game;

        // update form
        this.gameForm.patchValue({
          home: { team: this.game.home._id },
          away: { team: this.game.away._id }
        });

        // add scores if exists
        if (this.game.home.score) {
          this.gameForm.patchValue({
            home: { score: this.game.home.score }
          });
        }

        if (this.game.away.score) {
          this.gameForm.patchValue({
            away: { score: this.game.away.score }
          });
        }

        // add start time if exists
        if (this.game.start) {
          this.gameForm.patchValue({ start: this.game.start });

          // add time if it is set
          if (this.game.time) {
            const date = new Date(this.game.start);
            const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
            const mins = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();

            const time = hours + ':' + mins;
            this.gameForm.patchValue({ time });

            // show places form field
            this.showPlaces = true;
          }
        }

        // add place if exists
        if (this.game.place && this.game.place._id) {
          this.gameForm.patchValue({ place: this.game.place._id });
          this.places = this.placeService.filterPlaces(this.places, this.game.start, this.game);
          this.showPlaces = true;

          // add locations if needed
          const index = this.places.findIndex((p: Place) => p._id === this.game.place._id);
          const place = this.places[index];

          if (place.locations && place.locations.length > 0) {
            this.gameForm.addControl('locations', new FormControl('', Validators.required));
            this.gameForm.patchValue({ locations: this.game.place.locations.map(l => l._id) });
            this.locations = place.locations;
            this.showLocations = true;
          }
        }
      } else {
        this.gameForm.addControl('group', new FormControl('', Validators.required));
      }

      // on time change, show places form field
      this.gameForm.get('time').valueChanges.subscribe(() => {
        this.updatePlaces();
      });

      this.gameForm.get('start').valueChanges.subscribe(() => {
        this.updatePlaces();
      });

      // on place change, show locations (if exists)
      this.gameForm.get('place').valueChanges.subscribe(val => {
        if (!val) {
          this.gameForm.removeControl('locations');
          this.showLocations = false;
          this.locations = [];
          return;
        }

        const index = this.places.findIndex((p: Place) => p._id === val);
        const place = this.places[index];

        if (place.locations && place.locations.length > 0) {
          this.gameForm.addControl('locations', new FormControl('', Validators.required));
          this.places = this.placeService.filterPlaces(this.places, this.game.start, this.game);
          this.showLocations = true;
          this.locations = place.locations;
        }
      });
    });
  }

  displayFn(group: GameGroup): string | undefined {
    return group ? group.label : undefined;
  }

  updatePlaces() {
    let start = this.gameForm.get('start').value;
    const time = this.gameForm.get('time').value;

    // reset values, and hide locations
    this.gameForm.patchValue({ place: '', locations: [] });
    this.showLocations = false;

    // check to show/filter places
    if (start && time) {
      start = new Date(this.gameForm.value.start);
      const hour = time.substr(0, time.indexOf(':'));
      const mins = time.substr(time.indexOf(':') + 1);

      start.setHours(hour, mins);
      start = start.toJSON();

      this.places = this.placeService.filterPlaces(this.places, start, this.game);
      this.showPlaces = true;
    } else {
      this.showPlaces = false;
    }
  }

  onSubmit() {
    if (this.gameForm.valid) {
      const homeIndex = this.league.teams.findIndex(t => t._id === this.gameForm.value.home.team);
      const home = this.league.teams[homeIndex];

      const awayIndex = this.league.teams.findIndex(t => t._id === this.gameForm.value.away.team);
      const away = this.league.teams[awayIndex];

      // create new game
      if (!this.game) {
        this.game = {
          home: {
            _id: home._id,
            name: home.name,
            score: this.gameForm.value.home.score
          },
          away: {
            _id: away._id,
            name: away.name,
            score: this.gameForm.value.away.score
          }
        };
      } else {
        // update data
        this.game.home = {
          _id: home._id,
          name: home.name,
          score: this.gameForm.value.home.score
        };

        this.game.away = {
          _id: away._id,
          name: away.name,
          score: this.gameForm.value.away.score
        };
      }

      // update start date / time
      if (this.gameForm.value.start) {
        const start = new Date(this.gameForm.value.start);

        if (this.gameForm.value.time) {
          const time = this.gameForm.value.time;
          const hour = time.substr(0, time.indexOf(':'));
          const mins = time.substr(time.indexOf(':') + 1);

          start.setHours(hour, mins);

          this.game.time = true;
        } else {
          this.game.time = false;
        }

        this.game.start = start.toJSON();
      }

      // update place
      if (this.gameForm.value.place) {
        const index = this.places.findIndex((p: Place) => p._id === this.gameForm.value.place);
        const place = this.places[index];

        this.game.place = {
          _id: place._id,
          label: place.label,
          address: place.address
        };

        // update locations
        if (this.gameForm.value.locations) {
          const locations = this.gameForm.value.locations;
          this.game.place.locations = place.locations.reduce((acc: Location[], l: Location) => {
            if (locations.includes(l._id)) { acc.push(l); }
            return acc;
          }, []);
        }
      } else {
        delete this.game.place;
      }

      this.dialogRef.close({
        game: this.game,
        group: this.gameForm.value.group
      });
    }
  }
}
