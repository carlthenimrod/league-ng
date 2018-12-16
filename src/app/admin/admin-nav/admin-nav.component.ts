import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { slideNavTrigger, toggleNotificationTrigger } from './animations';
import { NotificationService } from '@app/core/notification.service';
import { NotificationList } from '@app/models/notification';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  animations: [slideNavTrigger, toggleNotificationTrigger]
})
export class AdminNavComponent implements OnInit, OnDestroy {
  notifications: NotificationList;
  notificationSubscription: Subscription;
  streamSubscription: Subscription;
  menu = 'closed';

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.streamSubscription = this.notificationService.stream().subscribe();

    this.notificationSubscription = this.notificationService.notificationsListener().subscribe((notifications: NotificationList) => {
      this.notifications = notifications;
    });
  }

  onMenuClick() {
    if (this.menu === 'closed') {
      this.menu = 'open';
    } else {
      this.menu = 'closed';
    }
  }

  onCloseClick() {
    this.menu = 'closed';
  }

  ngOnDestroy() {
    this.streamSubscription.unsubscribe();
  }
}
