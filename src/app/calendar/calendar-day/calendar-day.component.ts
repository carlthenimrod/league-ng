import { Component, OnInit, Input, HostBinding, ViewContainerRef, HostListener, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Game } from '@app/models/game';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() games: Game[];
  @Output() gamesSelected: EventEmitter<Game[]> = new EventEmitter();
  dayOfWeek: string;

  constructor(public vc: ViewContainerRef) { }

  ngOnInit() {
    this.dayOfWeek = this.date.format('ddd').toLowerCase();
  }

  @HostListener('click') onclick() {
    if (this.games.length === 0) { return; }
    this.gamesSelected.emit(this.games);
  }
  
  @HostBinding('class') get weekClass() {
    const classes = [];

    classes.push(this.dayOfWeek);
    if (this.games.length > 0) { classes.push('games'); }

    return classes.join(' ');
  }
}
