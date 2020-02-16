import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { Me } from '@app/models/auth';
import { UserNotificationsService } from '@app/services/user-notifications.service';
import { NavService } from './nav/nav.service';
import { ViewportService } from '@app/services/viewport.service';
import { NotificationService } from './notification/notification.service';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { unreadNotificationsTrigger } from './animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [unreadNotificationsTrigger]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  @ViewChild('desktopNav', { read: ViewContainerRef, static: false }) desktopNav: ViewContainerRef;
  isMobile: boolean;
  $unread: Observable<boolean>;
  me: Me;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private navService: NavService,
    private notifications: NotificationService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.auth.me$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(me => {
        this.me = me;
        if (!me) { return; }

        this.$unread = this.notifications.unread$;
      });

    this.viewport.type$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
      });
  }

  ngAfterViewInit() {
    this.navService.init(this.desktopNav);
  }

  onClickToggleNav() {
    this.navService.toggleNav();
  }

  onClickToggleNotifications() {
    this.notifications.toggle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
