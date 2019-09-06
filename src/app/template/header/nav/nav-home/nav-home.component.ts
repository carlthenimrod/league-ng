import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from '@app/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit, OnDestroy {
  @Output() linkClick = new EventEmitter<boolean>();
  isMobile: boolean;
  loggedIn: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
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

  onClick() {
    this.linkClick.emit(true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
