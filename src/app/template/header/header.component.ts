import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';

import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';
import { UserNotificationsService } from '@app/services/user-notifications.service';
import { unreadNotificationsTrigger } from './animations';
import { Subscription, Observable } from 'rxjs';
import { NavService } from './nav/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [unreadNotificationsTrigger]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  @ViewChild('desktopNav', { read: ViewContainerRef, static: false }) desktopNav: ViewContainerRef;
  $unread: Observable<boolean>;
  $loggedIn: Observable<boolean>;
  loggedInSub: Subscription;
  loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private navService: NavService,
    private userNotifications: UserNotificationsService
  ) { }

  ngOnInit() {
    this.loggedInSub = this.authService.$loggedIn().subscribe(loggedIn => {
      if (loggedIn) {
        const auth: Auth = this.authService.getAuth();
  
        this.userNotifications.get(auth._id);
  
        this.$unread = this.userNotifications.$unread();
      }

      this.loggedIn = loggedIn;
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
    this.loggedInSub.unsubscribe();
  }
}
