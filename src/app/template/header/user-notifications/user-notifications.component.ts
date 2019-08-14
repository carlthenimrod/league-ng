import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { UserNotification, UserNotificationReply } from '@app/models/user';
import { userNotificationsTrigger } from './animations';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
  animations: [userNotificationsTrigger]
})
export class UserNotificationsComponent implements OnInit, OnDestroy {
  @Input() notifications: UserNotification[];
  @Output() reply: EventEmitter<UserNotificationReply> = new EventEmitter();
  @HostBinding('@userNotifications') userNotifications;

  constructor() { }

  ngOnInit() {
    console.log('created');
    console.log(this.notifications);
  }

  ngOnDestroy() {
    console.log('destroyed');
  }

  onClickReply(notification: UserNotification, reply: string) {
    this.reply.next({
      notification,
      reply
    });
  }
}
