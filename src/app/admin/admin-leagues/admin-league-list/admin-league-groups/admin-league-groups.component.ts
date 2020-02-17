import { Component, Input } from '@angular/core';

import { LeagueGroup, League } from '@app/models/league';

@Component({
  selector: 'admin-league-groups',
  styleUrls: ['./admin-league-groups.component.scss'],
  templateUrl: './admin-league-groups.component.html'
})
export class AdminLeagueGroupsComponent {
  @Input() groups: LeagueGroup[];
  @Input() ungrouped: League[];
}
