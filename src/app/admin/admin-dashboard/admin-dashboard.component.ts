import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationList } from '@app/models/notification';
import { NotificationService } from '@app/core/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  notifications: NotificationList;
  notificationSubscription: Subscription;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.notificationsListener().subscribe((notifications: NotificationList) => {
      this.notifications = notifications;
    });
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }
}
