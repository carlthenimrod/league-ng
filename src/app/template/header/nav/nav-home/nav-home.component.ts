import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { NavService } from '../nav.service';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  loggedIn: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private navService: NavService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.auth.loggedIn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loggedIn => this.loggedIn = loggedIn);

    this.viewport.type$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type =>  {
        this.isMobile = (type === 'mobile') ? true : false;
      });
  }

  onClick(url?: string[]) {
    this.navService.navigate(url);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
