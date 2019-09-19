import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { Game } from '@app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  @Input() size: string;
  @Input() class = '';
  @HostBinding('class') get classes(): string {
    return [this.class, this.size].join(' ');
  }

  constructor() { }

  ngOnInit() {
  }

}
