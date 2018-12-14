import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import _ from 'lodash';

import { NotificationList, NotificationResponse, Notification } from '@app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  api = environment.api;

  notifications: NotificationList = {
    leagues: [],
    teams: [],
    users: []
  };
  notificationsBehaviorSubject: BehaviorSubject<NotificationList> = new BehaviorSubject<NotificationList>(this.notifications);

  constructor(private http: HttpClient) {}

  all() {
    const url = this.api + 'notifications';
    this.http.get(url).pipe(map(this.formatNotifications))
    .subscribe((notifications: NotificationList) => {
      this.notifications = notifications;
      this.notificationsBehaviorSubject.next(_.cloneDeep(this.notifications));
    });
  }

  formatNotifications(notifications: NotificationResponse): NotificationList {
    const notificationList: NotificationList = {
      leagues: [],
      teams: [],
      users: []
    };

    for (let i = 0; i < notifications.leagues.length; i++) {
      const l = notifications.leagues[i];
    }

    for (let i = 0; i < notifications.teams.length; i++) {
      const t = notifications.teams[i];

      const notification: Notification = {
        _id: t._id,
        status: t.status,
        message: `New Team: ${t.name}.`
      };

      notificationList.teams.push(notification);
    }

    for (let i = 0; i < notifications.users.length; i++) {
      const u = notifications.users[i];

      const notification: Notification = {
        _id: u._id,
        status: u.status,
        message: `New User: ${u.name}.`
      };

      notificationList.users.push(notification);
    }

    return notificationList;
  }

  notificationsListener() {
    return this.notificationsBehaviorSubject.asObservable();
  }
}
