import { Component, OnInit, Input } from '@angular/core';

import { League } from '@app/models/league';
import { TeamService } from '@app/services/team.service';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-league-standings',
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.scss']
})
export class LeagueStandingsComponent implements OnInit {
  @Input() league: League;
  teams: Team[];

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teams = this.teamService.calculateStandings(this.league);

    console.log(this.teams);
  }
}
