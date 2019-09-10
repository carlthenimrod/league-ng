import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';

import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';
import { UserNotificationsService } from '@app/services/user-notifications.service';
import { NavService } from './nav/nav.service';
import { ViewportService } from '@app/services/viewport.service';
import { unreadNotificationsTrigger } from './animations';
import { takeUntil } from 'rxjs/operators';

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
  $loggedIn: Observable<boolean>;
  loggedIn: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private navService: NavService,
    private userNotifications: UserNotificationsService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.authService.loggedIn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loggedIn => {
        if (loggedIn) {
          const auth: Auth = this.authService.getAuth();

          this.userNotifications.get(auth._id);

          this.$unread = this.userNotifications.$unread();
        }

        this.loggedIn = loggedIn;
      });

    this.viewport.type$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
      });

    this.$unread = this.userNotifications.$unread();
  }

  ngAfterViewInit() {
    this.navService.init(this.desktopNav);
  }

  onClickToggleNav() {
    this.navService.toggleNav();
  }

  onClickToggleNotifications() {
    this.userNotifications.toggleNotifications(this.vc);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
