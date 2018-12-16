import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import _ from 'lodash';

import { NotificationList, NotificationResponse } from '@app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  api = environment.api;

  notifications: NotificationList = {
    notifications: [],
    leagues: 0,
    teams: 0,
    users: 0,
    total: 0
  };
  notificationsBehaviorSubject: BehaviorSubject<NotificationList> = new BehaviorSubject<NotificationList>(this.notifications);

  constructor(private http: HttpClient) {}

  stream(): Observable<any> {
    const url = this.api + 'notifications';
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(url)),
      map(this.formatNotifications),
      tap((notifications: NotificationList) => {
        this.notifications = notifications;
        this.notificationsBehaviorSubject.next(_.cloneDeep(this.notifications));
      })
    );
  }

  push() {
    const url = this.api + 'notifications';
    this.http.get(url).pipe(map(this.formatNotifications))
    .subscribe((notifications: NotificationList) => {
      this.notifications = notifications;
      this.notificationsBehaviorSubject.next(_.cloneDeep(this.notifications));
    });
  }

  notificationsListener() {
    return this.notificationsBehaviorSubject.asObservable();
  }

  formatNotifications(notifications: NotificationResponse[]): NotificationList {
    const notificationList: NotificationList = {
      notifications: [],
      leagues: 0,
      teams: 0,
      users: 0,
      total: 0
    };

    for (let i = 0; i < notifications.length; i++) {
      const n = notifications[i];

      switch (n.itemType) {
        case 'League':
          ++notificationList.leagues;
          break;

        case 'Team':
        ++notificationList.teams;
          break;

        case 'User':
        ++notificationList.users;
          break;
      }

      notificationList.notifications.push({
        _id: n._id,
        item: n.item,
        type: n.itemType,
        message: n.notice,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt
      });

      ++notificationList.total;
    }

    return notificationList;
  }
}
