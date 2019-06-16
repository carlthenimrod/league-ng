import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { Game } from '@app/models/game';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';

@Injectable()
export class CalendarService {
  vc: ViewContainerRef;
  games: Game[];
  selectedGame: Game;
  selectedGameSubject: BehaviorSubject<Game>;
  monthFactory: ComponentFactory<CalendarMonthComponent>;
  months: ComponentRef<CalendarMonthComponent>[];
  weekFactory: ComponentFactory<CalendarWeekComponent>;
  dayFactory: ComponentFactory<CalendarDayComponent>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
    this.monthFactory = this.resolver.resolveComponentFactory(CalendarMonthComponent);
    this.weekFactory = this.resolver.resolveComponentFactory(CalendarWeekComponent);
    this.dayFactory = this.resolver.resolveComponentFactory(CalendarDayComponent);
  }

  init(games: Game[]) {
    this.games = games;

    this.selectGame();
  }

  create(vc: ViewContainerRef) {
    this.vc = vc;
    this.createMonth(moment(this.selectedGame.start));

    const previousMonth = this.findPreviousMonth(this.selectedGame);
    if (previousMonth) {
      this.createMonth(previousMonth, 0);
    }

    const nextMonth = this.findNextMonth(this.selectedGame);
    if (nextMonth) {
      this.createMonth(nextMonth);
    }
  }

  createMonth(date: moment.Moment, index?: number) {
    const componentRef = this.vc.createComponent(this.monthFactory, index);

    componentRef.instance.date = date;
    componentRef.instance.$selectedGame = this.selectedGameSubject.asObservable();
    componentRef.changeDetectorRef.detectChanges();

    this.createDays(date, componentRef.instance.vc);
    componentRef.changeDetectorRef.detectChanges();
  }

  createDays(date: moment.Moment, vc: ViewContainerRef) {
    const totalDays = date.daysInMonth();
    let day = 1;
    let currentWeek: ComponentRef<CalendarWeekComponent>;
    
    while (day <= totalDays) {
      const currentDate = moment(date).date(day);

      if (!currentWeek || currentDate.day() === 0) {
        currentWeek = vc.createComponent(this.weekFactory);
        currentWeek.changeDetectorRef.detectChanges();
      }

      const componentRef = currentWeek.instance.vc.createComponent(this.dayFactory);
      componentRef.instance.date = currentDate;
      componentRef.instance.games = this.findGames(currentDate);
      componentRef.instance.$selectedGame = this.selectedGameSubject.asObservable();
      componentRef.instance.dayClicked.subscribe((games: Game[]) => {
        this.selectedGameSubject.next(games[0]);
      });

      ++day;
    }
  }

  selectGame() {
    const now = moment();

    for (let i = 0; i < this.games.length; i++) {
      const game = this.games[i];

      // if no date, or score, go to next game
      if (!game.start || (game.home.score && game.away.score)) {
        continue;
      }

      const start = moment(this.games[i].start);

      if (start.isSameOrAfter(now)) {
        this.selectedGame = game;
        this.selectedGameSubject = new BehaviorSubject(game);
        return;
      }
    }
  }

  findGames(date: moment.Moment): Game[] {
    const matches = [];

    this.games.forEach(game => {
      if (!game.start) { return; }

      if (moment(game.start).isSame(date, 'day')) {
        matches.push(game);
      }
    });

    return matches;
  }

  findPreviousMonth(game: Game): moment.Moment {
    let index = this.games.findIndex(g => g._id === game._id);
    const currentMonth = moment(game.start);

    while (index >= 0) {
      const gameStart = moment(this.games[index].start);
      if (!gameStart.isSame(currentMonth, 'month')) {
        return gameStart;
      }

      --index;
    }
  }

  findNextMonth(game: Game): moment.Moment {
    let index = this.games.findIndex(g => g._id === game._id);
    const currentMonth = moment(game.start);

    while (index < this.games.length) {
      const gameStart = moment(this.games[index].start);
      if (!gameStart.isSame(currentMonth, 'month')) {
        return gameStart;
      }

      ++index;
    }
  }

  $selectedGame(): Observable<Game> {
    return this.selectedGameSubject.asObservable();
  }
}
