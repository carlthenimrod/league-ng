import { Component, OnInit, Input } from '@angular/core';

import { Team } from '@app/models/team';
import { TeamInviteService } from '@app/team/team-invite/team-invite.service';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.scss']
})
export class TeamRosterComponent implements OnInit {
  @Input() team: Team;

  constructor(
    private teamInvite: TeamInviteService
  ) { }

  ngOnInit() {
  }

  onClickTeamInvite() {
    this.teamInvite.open(this.team);
  }
}
