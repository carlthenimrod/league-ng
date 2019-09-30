import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { League, Group } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { LeagueScheduleService } from '@app/services/league-schedule.service';
import { AuthService } from '@app/auth/auth.service';

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
    private authService: AuthService,
    private leagueService: LeagueService,
    private schedule: LeagueScheduleService
  ) { }

  ngOnInit() {
    this.league$ = this.leagueService.league$()
      .pipe(
        tap(league => {
          this.selectedGroupIndex = this.schedule.pickGroup(league);
          this.selectedGroup = league.schedule[this.selectedGroupIndex];

          if (this.selectedGroup) {
            const auth = this.authService.getAuth();
            if (auth && auth.teams.length > 0) {
              this.teamIds = auth.teams.map(team => team._id);
              league.schedule.forEach(group => this.schedule.orderGames(group, this.teamIds));
            }
          }
        })
      );
  }
}
