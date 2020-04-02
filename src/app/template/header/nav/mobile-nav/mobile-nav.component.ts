import { Component, OnDestroy, ContentChild, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { NavService } from '../nav.service';
import { NotificationService } from '../../notification/notification.service';
import { MobileNavToggleComponent } from '../mobile-toggle/mobile-toggle.component';
import { NotificationToggleComponent } from '../../notification/notification-toggle/notification-toggle.component';

@Component({
  selector: 'ngl-mobile-nav',
  template: '<ng-content></ng-content>'
})
export class MobileNavComponent implements AfterContentInit, OnDestroy {
  @ContentChild(MobileNavToggleComponent)
  private _navToggle: MobileNavToggleComponent;

  @ContentChild(NotificationToggleComponent)
  private _notificationToggle: NotificationToggleComponent;

  private _unsub$ = new Subject<void>();

  constructor(
    private _navService: NavService,
    private _notificationService: NotificationService
  ) { }

  ngAfterContentInit() {
    if (!this._navToggle) { return; }

    this._navToggle
      .clicked
      .pipe(
        tap(_ => this._notificationService.close()),
        takeUntil(this._unsub$)
      )
      .subscribe(_ => this._navService.toggle());

    this._notificationToggle
        .clicked
        .pipe(
          tap(_ => this._navService.close()),
          takeUntil(this._unsub$)
        )
        .subscribe(_ => this._notificationService.toggle());
  }

  ngOnDestroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
