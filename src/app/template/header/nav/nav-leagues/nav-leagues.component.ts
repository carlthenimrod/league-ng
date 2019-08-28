import { Component, Input, Output, EventEmitter } from '@angular/core';

import { League } from '@app/models/league';

@Component({
  selector: 'app-nav-leagues',
  templateUrl: './nav-leagues.component.html',
  styleUrls: ['./nav-leagues.component.scss']
})
export class NavLeaguesComponent {
  @Input() leagues: League[];
  @Output() linkClick = new EventEmitter<boolean>();

  constructor() { }

  onClick() {
    this.linkClick.emit(true);
  }
}
