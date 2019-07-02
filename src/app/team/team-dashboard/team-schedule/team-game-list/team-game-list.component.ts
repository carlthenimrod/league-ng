import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Team } from '@app/models/team';
import { Game } from '@app/models/game';
import { CalendarService } from '@app/calendar/calendar.service';

@Component({
  selector: 'app-team-game-list',
  templateUrl: './team-game-list.component.html',
  styleUrls: ['./team-game-list.component.scss']
})
export class TeamGameListComponent implements OnInit, OnDestroy {
  @Input() team: Team;
  selectedGame: Game;
  isHome: boolean;
  gameSub: Subscription;

  constructor(private calendar: CalendarService) { }

  ngOnInit() {
    this.gameSub = this.calendar.$selectedGame()
      .subscribe((game: Game) => {
        this.selectedGame = game;
        this.isHome = game.home._id === this.team._id ? true : false;
      });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }
}
