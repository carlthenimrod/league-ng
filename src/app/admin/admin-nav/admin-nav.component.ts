import { Component, OnInit } from '@angular/core';

import { slideNavTrigger } from './animations';
import { NotificationService } from '@app/core/notification.service';
import { NotificationList } from '@app/models/notification';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  animations: [slideNavTrigger]
})
export class AdminNavComponent implements OnInit {

  notifications: NotificationList;
  menu = 'closed';

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.notificationListener().subscribe((notifications: NotificationList) => {
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
}
