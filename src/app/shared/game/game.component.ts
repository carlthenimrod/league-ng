import { Component, OnInit, Input, OnDestroy, OnChanges, ElementRef, Renderer2 } from '@angular/core';
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
  @Input() type: string;
  auth: Auth;
  loggedIn: boolean;
  isHome: boolean;
  isAway: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.authService.loggedIn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loggedIn => {
        this.loggedIn = loggedIn;
        this.auth = this.authService.getAuth();
        this.checkAwayOrHome();
      });

    if (this.type) { this.renderer.addClass(this.el.nativeElement, this.type); }
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

  haveScore(game: Game): boolean {
    if (typeof game.home.score !== 'number') { return false; }
    if (typeof game.away.score !== 'number') { return false; }

    return true;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
