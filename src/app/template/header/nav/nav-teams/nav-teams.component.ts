import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Team } from '@app/models/team';

@Component({
  selector: 'app-nav-teams',
  templateUrl: './nav-teams.component.html',
  styleUrls: ['./nav-teams.component.scss']
})
export class NavTeamsComponent {
  @Input() teams: Team[];
  @Output() linkClick = new EventEmitter<boolean>();

  constructor() { }

  onClick() {
    this.linkClick.emit(true);
  }
}
