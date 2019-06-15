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
  nextGame: Game;
  selectedGame: BehaviorSubject<Game>;
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

    this.findNextGame();
  }

  create(vc: ViewContainerRef) {
    this.vc = vc;
    this.createMonth(moment(this.nextGame.start));
  }

  createMonth(date: moment.Moment) {
    const month = this.vc.createComponent(this.monthFactory);

    month.instance.date = date;
    month.changeDetectorRef.detectChanges();

    this.createDays(date, month.instance.vc);
    month.changeDetectorRef.detectChanges();
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
      componentRef.instance.gamesSelected.subscribe((games: Game[]) => {
        this.selectedGame.next(games[0]);
      });

      ++day;
    }
  }

  findNextGame() {
    const now = moment();

    for (let i = 0; i < this.games.length; i++) {
      const game = this.games[i];

      // if no date, or score, go to next game
      if (!game.start || (game.home.score && game.away.score)) {
        continue;
      }

      const start = moment(this.games[i].start);

      if (start.isSameOrAfter(now)) {
        this.nextGame = game;
        this.selectedGame = new BehaviorSubject(game);
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

  $selectedGame(): Observable<Game> {
    return this.selectedGame.asObservable();
  }
}
