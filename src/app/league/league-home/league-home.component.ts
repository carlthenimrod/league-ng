import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, mergeMap, map } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { LeagueService } from '@app/services/league.service';
import { LeagueScheduleService } from '@app/services/league-schedule.service';
import { League, Group } from '@app/models/league';
import { Game } from '@app/models/game';

@Component({
  selector: 'app-league-home',
  templateUrl: './league-home.component.html',
  styleUrls: ['./league-home.component.scss']
})
export class LeagueHomeComponent implements OnInit {
  league$: Observable<League>;
  selectedGroup: Group;
  selectedGame: Game;
  teamIds: string[] = [];

  constructor(
    private authService: AuthService,
    private leagueService: LeagueService,
    private schedule: LeagueScheduleService
  ) { }

  ngOnInit() {
    this.league$ = this.leagueService.league$()
      .pipe(
        tap(league => {
          this.selectedGroup = league.schedule[this.schedule.pickGroup(league)];
        }),
        mergeMap(league => this.authService.me$
          .pipe(
            map(me => {
              if (this.selectedGroup) {
                if (me && me.teams.length > 0) {
                  this.teamIds = me.teams.map(team => team._id);
                  this.schedule.orderGames(this.selectedGroup, this.teamIds);
                }
                this.selectedGame = this.selectedGroup.games[0];
              }
              return league;
            })
          )
        )
      );
  }
}
