import { Component, Input } from '@angular/core';

import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-league-header',
  templateUrl: './admin-league-header.component.html',
  styleUrls: ['./admin-league-header.component.scss']
})
export class AdminLeagueHeaderComponent {
  @Input() league: League;

  constructor() { }
}
