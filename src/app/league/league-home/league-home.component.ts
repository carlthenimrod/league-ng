import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

          if (this.selectedGroup) {
            const auth = this.authService.getAuth();
            if (auth && auth.teams.length > 0) {
              this.teamIds = auth.teams.map(team => team._id);
              this.schedule.orderGames(this.selectedGroup, this.teamIds);
            }
            this.selectedGame = this.selectedGroup.games[0];
          }
        })
      );
  }
}
