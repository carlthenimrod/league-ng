import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { TeamService } from '@app/core/team.service';
import { Team } from '@app/models/team';

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
      this.teams = teams;
      this.teamList = teams;
    });
  }

  onResults(teams: Team[]) {
    this.teamList = teams;
  }
}
