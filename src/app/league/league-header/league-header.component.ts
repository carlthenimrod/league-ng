import { Component, Input, EventEmitter, Output } from '@angular/core';

import { League } from '@app/models/league';

@Component({
  selector: 'app-league-header',
  templateUrl: './league-header.component.html',
  styleUrls: ['./league-header.component.scss']
})
export class LeagueHeaderComponent {
  @Input() league: League;
  @Input() selected: string;
  @Output() navClick = new EventEmitter<string>();

  constructor() { }

  onClick(clicked: string) {
    if (this.selected === clicked) { return; }
    this.navClick.emit(clicked);
  }
}
