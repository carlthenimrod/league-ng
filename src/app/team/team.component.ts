import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSocketService } from '@app/services/team-socket.service';

@Component({
  selector: 'app-team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  team: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private teamSocket: TeamSocketService
  ) { }

  ngOnInit() {
    this.teamService.teamListener().subscribe((team: Team) => this.team = team);

    this.route.data.subscribe((data: {team: Team}) => {
      this.team = data.team;

      this.teamSocket.connected$().subscribe(connected => {
        if (connected) { this.teamSocket.join(this.team._id); }
      });
    });
  }

  ngOnDestroy() {
    this.teamSocket.leave(this.team._id);
  }
}
