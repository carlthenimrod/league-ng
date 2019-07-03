import { Component, OnInit, Input } from '@angular/core';

import { Game } from '@app/models/game';

@Component({
  selector: 'app-team-selected-game',
  templateUrl: './team-selected-game.component.html',
  styleUrls: ['./team-selected-game.component.scss']
})
export class TeamSelectedGameComponent implements OnInit {
  @Input() game: Game;
  @Input() isHome: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.game);
  }

}
