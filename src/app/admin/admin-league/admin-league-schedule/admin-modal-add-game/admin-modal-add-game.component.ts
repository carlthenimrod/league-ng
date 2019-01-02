import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { League, Group } from '@app/models/league';
import { Game } from '@app/models/game';

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
    time: ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, game?: Game },
    private dialogRef: MatDialogRef<AdminModalAddGameComponent>,
    private fb: FormBuilder
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
        }
      }
    } else {
      this.gameForm.addControl('group', new FormControl('', Validators.required));
    }
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

      this.dialogRef.close({
        game: this.game,
        group: this.gameForm.value.group
      });
    }
  }
}
