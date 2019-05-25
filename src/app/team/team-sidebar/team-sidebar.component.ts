import { Component, OnInit } from '@angular/core';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-sidebar',
  templateUrl: './team-sidebar.component.html',
  styleUrls: ['./team-sidebar.component.scss']
})
export class TeamSidebarComponent implements OnInit {
  team: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.teamListener().subscribe((team: Team) => this.team = team);

    this.route.data.subscribe((data: {team: Team}) => {
      this.team = data.team;
    });
  }

}
