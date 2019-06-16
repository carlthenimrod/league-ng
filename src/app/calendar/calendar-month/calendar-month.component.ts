import { Component, OnInit, Input, ViewChild, ViewContainerRef, OnDestroy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

import { Game } from '@app/models/game';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit, OnDestroy {
  @Input() date: moment.Moment;
  @Input() $selectedGame: Observable<Game>;
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  gameSub: Subscription;
  state: string;

  constructor() { }

  @HostBinding('class') get setClass() {
    return this.state;
  }

  ngOnInit() {
    this.gameSub = this.$selectedGame.subscribe(game => {
      if (!game.start) { return; }
      const gameStart = moment(game.start);
      
      if (gameStart.isSame(this.date, 'month')) {
        this.state = 'active';
      } else if (gameStart.isBefore(this.date, 'month')) {
        this.state = 'next';
      } else {
        this.state = 'previous';
      }
    });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }
}
