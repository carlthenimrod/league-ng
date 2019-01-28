import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '@app/models/team';
import { TeamWebsocketService } from './team-websocket.service';

@Component({
  selector: 'app-team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ws: TeamWebsocketService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {team: Team}) => {
      const team = data.team;
    });
  }
}
