import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.scss']
})
export class AdminTeamListComponent implements OnInit {
  teams$: Observable<Team[]>;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teams$ = this.teamService.get$();
  }
}
