import { Component, OnInit, Input } from '@angular/core';

import { Group } from '@app/models/league';
import { gameListToggleTrigger } from './animations';

@Component({
  selector: 'app-admin-game-group',
  templateUrl: './admin-game-group.component.html',
  styleUrls: ['./admin-game-group.component.scss'],
  animations: [gameListToggleTrigger]
})
export class AdminGameGroupComponent implements OnInit {
  @Input() group: Group;
  show = false;

  constructor() { }

  ngOnInit() {
  }

  onClickEditGame() {

  }

  onClickEditGroup($event: MouseEvent) {
    $event.stopPropagation();
  }

  onClickDeleteGroup($event: MouseEvent, group: Group) {
    $event.stopPropagation();

    const msg = `Remove ${group.label}?\nWarning: This will also remove all games associated with ${group.label}`;

    if (confirm(msg)) {
      console.log('okay');
    }
  }
}
