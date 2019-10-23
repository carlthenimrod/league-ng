import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, mergeMap, map } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { League, Group } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { LeagueScheduleService } from '@app/services/league-schedule.service';

@Component({
  selector: 'app-league-schedule',
  templateUrl: './league-schedule.component.html',
  styleUrls: ['./league-schedule.component.scss']
})
export class LeagueScheduleComponent implements OnInit {
  league$: Observable<League>;
  selectedGroupIndex: number;
  selectedGroup: Group;
  teamIds: string[] = [];

  constructor(
    private auth: AuthService,
    private leagueService: LeagueService,
    private schedule: LeagueScheduleService
  ) { }

  ngOnInit() {
    this.league$ = this.leagueService.league$
      .pipe(
        tap(league => {
          this.selectedGroupIndex = this.schedule.pickGroup(league);
          this.selectedGroup = league.schedule[this.selectedGroupIndex];
        }),
        mergeMap(league => this.auth.me$
          .pipe(
            map(me => {
              if (this.selectedGroup && me && me.teams.length > 0) {
                this.teamIds = me.teams.map(team => team._id);
                league.schedule.forEach(group => this.schedule.orderGames(group, this.teamIds));
              }
              return league;
            })
          )
        )
      );
  }
}
