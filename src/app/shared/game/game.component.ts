import { Component, OnInit, Input, OnDestroy, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { Game } from '@app/models/game';
import { Me } from '@app/models/auth';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: Game;
  @Input() type: string;
  me: Me;
  isHome: boolean;
  isAway: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.auth.me$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(me => {
        this.me = me;
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
    if (this.me) {
      const teamIds = this.me.teams.map(team => team._id);
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
