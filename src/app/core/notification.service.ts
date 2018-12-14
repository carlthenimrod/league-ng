import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NotificationList, Notification } from '@app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: NotificationList = {
    leagues: [],
    teams: [],
    users: []
  };

  notificationBehaviorSubject: BehaviorSubject<NotificationList> = new BehaviorSubject<NotificationList>(this.notifications);

  constructor() {}

  notificationListener() {
    return this.notificationBehaviorSubject.asObservable();
  }
}
