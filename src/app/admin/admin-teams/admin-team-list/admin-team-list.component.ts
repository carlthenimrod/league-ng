import { Component, OnInit } from '@angular/core';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.scss']
})
export class AdminTeamListComponent implements OnInit {
  teams: Team[];
  teamList: Team[];

  constructor(
    public teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.get$().subscribe(teams => {
      this.teams = teams;
      this.teamList = teams;
    });
  }

  onResults(teams: Team[]) {
    this.teamList = teams;
  }
}
