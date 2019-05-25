import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '@app/models/team';
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
    private teamSocket: TeamSocketService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {team: Team}) => {
      this.team = data.team;

      this.teamSocket.join(this.team._id);
    });
  }

  ngOnDestroy() {
    this.teamSocket.leave(this.team._id);
  }
}
