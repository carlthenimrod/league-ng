import { Component, OnInit, Input, ViewChild, ViewContainerRef, OnDestroy, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

import { Game } from '@app/models/game';
import { monthSlider } from './animations';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  animations: [monthSlider]
})
export class CalendarMonthComponent implements OnInit, OnDestroy {
  @Input() date: moment.Moment;
  @Input() $selectedGame: Observable<Game>;
  @Output() changeMonth: EventEmitter<string> = new EventEmitter();
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  gameSub: Subscription;
  animating = false;
  state: string;

  constructor() { }

  @HostBinding('class') get setClass() {
    return this.state;
  }

  @HostBinding('@monthSlider') get slide() {
    return this.state;
  }

  @HostListener('@monthSlider.start') onAnimateStart() {
    this.animating = true;
  }

  @HostListener('@monthSlider.done') onAnimateDone() {
    this.animating = false;
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

  onClickChangeMonth(value: string) {
    if (this.animating) { return; }
    this.changeMonth.emit(value);
  }
}
