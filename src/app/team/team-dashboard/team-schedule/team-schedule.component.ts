import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { CalendarService } from '@app/calendar/calendar.service';
import { Game } from '@app/models/game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit, OnDestroy {
  @Input() schedule: Game[];
  gameSub: Subscription;
  selectedGame: Game;

  constructor(private calendar: CalendarService) { }

  ngOnInit() {
    this.calendar.init(this.schedule);
    this.gameSub = this.calendar.$selectedGame()
      .subscribe((game: Game) => {
        this.selectedGame = game;
      });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }
}
