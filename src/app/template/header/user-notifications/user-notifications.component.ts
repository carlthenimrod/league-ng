import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { UserNotification, UserNotificationReply } from '@app/models/user';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit, OnDestroy {
  @Input() notifications: UserNotification[];
  @Output() reply: EventEmitter<UserNotificationReply> = new EventEmitter();
  
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
