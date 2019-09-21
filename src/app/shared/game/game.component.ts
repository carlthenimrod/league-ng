import { Component, OnInit, Input, HostBinding, OnDestroy, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Game } from '@app/models/game';
import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: Game;
  @Input() size: string;
  @Input() class = '';
  @HostBinding('class.sm') get addClass(): boolean {
    return (this.size === 'sm') ? true : false;
  }
  auth: Auth;
  loggedIn: boolean;
  isHome: boolean;
  isAway: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loggedIn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loggedIn => {
        this.loggedIn = loggedIn;
        this.auth = this.authService.getAuth();
        this.checkAwayOrHome();
      });
  }

  ngOnChanges() {
    this.checkAwayOrHome();
  }

  isUser(homeOrAway: string): boolean {
    if (homeOrAway === 'home' && this.isHome) { return true; }
    if (homeOrAway === 'away' && this.isAway) { return true; }
    return false;
  }

  checkAwayOrHome() {
    if (this.loggedIn) {
      const teamIds = this.auth.teams.map(team => team._id);
      this.isHome = (teamIds.includes(this.game.home._id)) ? true : false;
      this.isAway = (teamIds.includes(this.game.away._id)) ? true : false;
    } else {
      this.isHome = false;
      this.isAway = false;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
