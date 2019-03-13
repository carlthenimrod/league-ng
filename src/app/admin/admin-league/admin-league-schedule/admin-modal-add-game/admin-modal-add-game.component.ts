import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { League, Group } from '@app/models/league';
import { Game } from '@app/models/game';
import { Place, PlaceLocation } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';

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
  locations: PlaceLocation[];
  showLocations = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, game?: Game },
    private dialogRef: MatDialogRef<AdminModalAddGameComponent>,
    private fb: FormBuilder,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

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

      // get all places
      this.placeService.all().subscribe((places: Place[]) => {
        this.places = places;

        // add place if exists
        if (this.game.place) {
          this.gameForm.patchValue({ place: this.game.place._id });
          this.showPlaces = true;

          // add locations if needed
          const index = places.findIndex((p: Place) => p._id === this.game.place._id);
          const place = places[index];

          if (place.locations.length > 0) {
            this.gameForm.addControl('locations', new FormControl('', Validators.required));
            this.gameForm.patchValue({ locations: this.game.place.locations.map(l => l._id) });
            this.locations = place.locations;
            this.showLocations = true;
          }
        }
      });
    } else {
      this.gameForm.addControl('group', new FormControl('', Validators.required));
    }

    // on time change, show places form field
    this.gameForm.get('time').valueChanges.subscribe(val => {
      this.showPlaces = (val) ? true : false;
    });

    // on place change, show locations (if exists)
    this.gameForm.get('place').valueChanges.subscribe(val => {
      const index = this.places.findIndex((p: Place) => p._id === val);
      const place = this.places[index];

      if (place.locations.length > 0) {
        this.gameForm.addControl('locations', new FormControl('', Validators.required));
        this.showLocations = true;
        this.locations = place.locations;
      } else {
        this.gameForm.removeControl('locations');
        this.showLocations = false;
        this.locations = [];
      }
    });
  }

  displayFn(group: Group): string | undefined {
    return group ? group.label : undefined;
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
          name: place.name,
          address: place.address
        };

        // update locations
        if (this.gameForm.value.locations) {
          const locations = this.gameForm.value.locations;
          this.game.place.locations = place.locations.reduce((acc: PlaceLocation[], l: PlaceLocation) => {
            if (locations.includes(l._id)) { acc.push(l); }
            return acc;
          }, []);
        }
      }

      this.dialogRef.close({
        game: this.game,
        group: this.gameForm.value.group
      });
    }
  }
}
