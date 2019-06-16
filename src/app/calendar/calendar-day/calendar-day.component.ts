import { Component, OnInit, Input, HostBinding, ViewContainerRef, HostListener, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

import { Game } from '@app/models/game';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnDestroy {
  @Input() date: moment.Moment;
  @Input() games: Game[];
  @Input() $selectedGame: Observable<Game>;
  @Output() dayClicked: EventEmitter<Game[]> = new EventEmitter();
  gameSub: Subscription;
  isSelected: boolean;
  dayOfWeek: string;

  constructor(public vc: ViewContainerRef) { }

  ngOnInit() {
    this.dayOfWeek = this.date.format('ddd').toLowerCase();

    this.gameSub = this.$selectedGame.subscribe(game => {
      if (!game.start) { 
        this.isSelected = false;
        return; 
      }

      const gameStart = moment(game.start);
      
      if (gameStart.isSame(this.date, 'day')) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }

  @HostListener('click') onclick() {
    if (this.games.length === 0) { return; }
    this.dayClicked.emit(this.games);
  }
  
  @HostBinding('class') get weekClass() {
    const classes = [];

    classes.push(this.dayOfWeek);
    if (this.games.length > 0) { classes.push('games'); }
    if (this.isSelected) { classes.push('active'); }

    return classes.join(' ');
  }
}
