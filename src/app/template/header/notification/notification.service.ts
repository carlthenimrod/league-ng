import { Injectable, ApplicationRef, Inject, Injector, ComponentFactoryResolver, OnDestroy, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';
import { environment } from '@env/environment';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { AuthService } from '@app/auth/auth.service';
import { Me } from '@app/models/auth';
import { Notification, NotificationResponse } from '@app/models/notification';
import { NotificationComponent } from './notification.component';
import { SocketService } from '@app/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends UIModalService implements OnDestroy {
  private _api: string = environment.api;
  private _me: Me;
  protected _componentTypeWrapper: Type<NotificationComponent> = NotificationComponent;

  private _notifications: Notification[];
  private _notificationsSubject: Subject<Notification[]> = new BehaviorSubject(null);
  notifications$ = this._notificationsSubject.asObservable();

  private _unreadSubject = new BehaviorSubject<boolean>(false);
  unread$ = this._unreadSubject.asObservable();

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private socket: SocketService,
    appRef: ApplicationRef,
    @Inject(DOCUMENT) document: Document,
    injector: Injector,
    resolver: ComponentFactoryResolver
  ) {
    super(appRef, document, injector, resolver);

    this.auth.me$
      .subscribe(me => {
        this._me = me;

        this._me
          ? this.refresh()
          : this._notificationsSubject.next(null);
      });

    this.socket.notification$
      .pipe(
        tap(() => this._unreadSubject.next(true)),
        map<NotificationResponse, Notification>(this._transform.bind(this))
      )
      .subscribe(n => {
        this._notifications.unshift(n);
        this._notificationsSubject.next(_.cloneDeep(this._notifications));
      });
  }

  open() {
    super.open();

    this._read$().subscribe(notifications => {
      this._notifications = notifications;
      this._notificationsSubject.next(_.cloneDeep(this._notifications));
    });
  }

  refresh() {
    this._get$()
      .subscribe(notifications => {
        this._notifications = notifications;
        this._notificationsSubject.next(_.cloneDeep(this._notifications));
      });
  }

  filter(selected: string[]) {
    if (this._notifications && this._notifications.length > 0) {
      const filtered = this._notifications.filter(n => selected.includes(n.type));

      this._notificationsSubject.next(filtered);
    }
  }

  put$(notification: Notification, values: { [key: string]: any }): Observable<Notification> {
    return this.http.put<NotificationResponse>(`${this._api}users/${this._me._id}/notifications/${notification._id}`, values)
      .pipe(
        map(this._transform.bind(this)),
        tap<Notification>(savedNotification => {
          const index = this._notifications.findIndex(n => n._id === savedNotification._id);
          this._notifications[index] = savedNotification;
          this._notificationsSubject.next(_.cloneDeep(this._notifications));
        })
      );
  }

  private _read$(): Observable<Notification[]> {
    return this.http.post<NotificationResponse[]>(`${this._api}users/${this._me._id}/notifications/read`, {})
      .pipe(
        tap(() => this._unreadSubject.next(false)),
        map(this._map.bind(this))
      );
  }

  private _get$(): Observable<Notification[]> {
    return this.http.get<NotificationResponse[]>(`${this._api}users/${this._me._id}/notifications`)
      .pipe(
        tap(response => response.forEach(r => {
          if (!r.status.read) { this._unreadSubject.next(true); }
        })),
        map(this._map.bind(this))
      );
  }

  private _map(response: NotificationResponse[]): Notification[] {
    return response
      .reverse()
      .map(this._transform.bind(this));
  }

  private _transform(r: NotificationResponse): Notification {
    const { type, status, _id, team, user } = r;
    const updated = r.createdAt === r.updatedAt;

    return {
      type,
      status,
      updated,
      _id,
      team,
      user,
      message: this._formatMessage(r),
      date: !updated ? moment(r.createdAt).fromNow() : moment(r.updatedAt).fromNow()
    };
  }

  private _formatMessage(r: NotificationResponse): string {
    const { type, action, team, user } = r;

    switch (type) {
      case 'admin':
        switch (action) {
          case 'newTeam':
            return `New Team: ${ team.name }`;
          case 'newUser':
            return `New User: ${ user.fullName ? user.fullName : user.email }`;
        }
        break;
      case 'team':
          switch (action) {
            case 'invite':
              return `Invite sent to join: ${ team.name }`;
          }
        break;
      default:
        return `New Notification - Type: ${ type } Action: ${ action }`;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
