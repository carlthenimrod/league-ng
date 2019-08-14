import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';
import { UserNotificationsService } from '@app/services/user-notifications.service';
import { unreadNotificationsTrigger } from './animations';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [unreadNotificationsTrigger]
})
export class HeaderComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  $unread: Observable<boolean>;
  $loggedIn: Observable<boolean>;
  loggedInSub: Subscription;
  loggedIn: boolean;

  constructor(
    private authService: AuthService,
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

  onClickToggleNotifications() {
    this.userNotifications.toggleNotifications(this.vc);
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
