import { Component, OnInit } from '@angular/core';

import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent implements OnInit {
  teams: Team[];
  teamList: Team[];

  constructor(
    public teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.all().subscribe((teams: Team[]) => {
      console.log(teams);
      this.teams = teams;
      this.teamList = teams;
    });
  }

  onResults(teams: Team[]) {
    this.teamList = teams;
  }
}
