import { Component, OnInit, HostBinding, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Auth } from '@app/models/auth';
import { AuthService } from '@app/auth/auth.service';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  @Output() linkClicked = new EventEmitter<boolean>();
  @HostBinding('class.open') navOpen: boolean;
  auth: Auth;
  isMobile: boolean;
  selected = 'home';
  path: string[] = [];
  path$: Observable<string[]>;
  unsubscribe$ = new Subject<void>();

  @HostListener('touchmove', ['$event']) touchMove(e: TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  constructor(
    private authService: AuthService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.authService.loggedIn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loggedIn => {
        this.auth = (loggedIn) ? this.authService.getAuth() : null;
      });

    this.path$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(path => {
        this.path = path;
        this.updateNav();
      });

    this.viewport.type$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
        if (this.isMobile) { this.updateNav(); }
      });
  }

  updateNav() {
    if (this.path.length === 0) {
      this.selected = 'home';
      return;
    }

    switch (this.path[0]) {
      case 'user':
        this.selected = 'user';
        break;
      case 'team':
        this.selected = 'teams';
        break;
      case 'league':
        this.selected = 'leagues';
        break;
      case 'admin':
        this.selected = 'admin';
        break;
      default:
        this.selected = 'home';
    }
  }

  onLinkClick() {
    this.linkClicked.emit(true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
