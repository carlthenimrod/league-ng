import { Component, OnInit, HostBinding, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Auth } from '@app/models/auth';
import { AuthService } from '@app/auth/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  @Output() linkClicked = new EventEmitter<boolean>();
  @HostBinding('class.open') navOpen: boolean;
  auth: Auth;
  selected = 'home';
  path: string[] = [];
  path$: Observable<string[]>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService
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
  }

  updateNav() {
    if (this.path.length === 0) {
      this.selected = 'home';
      return;
    }

    switch (this.path[0]) {
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
