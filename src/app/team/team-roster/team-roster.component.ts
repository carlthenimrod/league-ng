import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RosterUpdate } from '@app/models/socket';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSocketService } from '@app/services/team-socket.service';


@Component({
  selector: 'app-team-roster',
  styleUrls: ['./team-roster.component.scss'],
  templateUrl: './team-roster.component.html'
})
export class TeamRosterComponent implements OnInit, OnDestroy {
  @Input() team: Team;
  rosterSub: Subscription;

  constructor(
    private teamService: TeamService,
    private teamSocket: TeamSocketService
  ) {}

  ngOnInit() {
    this.rosterSub = this.teamSocket.roster$().subscribe((updates: RosterUpdate[]) => {
      this.teamService.updateRoster(this.team, updates);
    });
  }

  ngOnDestroy() {
    this.rosterSub.unsubscribe();
  }
}
