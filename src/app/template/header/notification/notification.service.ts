import { Injectable, ApplicationRef, Inject, Injector, ComponentFactoryResolver, OnDestroy, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';
import { environment } from '@env/environment';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { Notification, NotificationResponse } from '@app/models/notification';
import { NotificationComponent } from './notification.component';
import { LocalStorageService } from '@app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends UIModalService implements OnDestroy {
  protected _componentTypeWrapper: Type<NotificationComponent> = NotificationComponent;

  private _notifications: Notification[];
  private _notificationsSubject: Subject<Notification[]> = new BehaviorSubject(null);
  notifications$ = this._notificationsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    appRef: ApplicationRef,
    @Inject(DOCUMENT) document: Document,
    injector: Injector,
    resolver: ComponentFactoryResolver
  ) {
    super(appRef, document, injector, resolver);

    this.refresh();
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

  private _get$(): Observable<Notification[]> {
    const api = environment.api;
    const id = this.localStorage.get('_id');

    return this.http.get<NotificationResponse[]>(`${api}users/${id}/notifications`)
      .pipe<Notification[]>(
        map(this._map.bind(this))
      );
  }

  private _map(response: NotificationResponse[]): Notification[] {
    return response.reverse().map(r => {
      const { type, status, _id } = r;
      const updated = r.createdAt === r.updatedAt;

      return {
        type,
        status,
        updated,
        _id,
        message: this._formatMessage(r),
        date: !updated ? moment(r.createdAt).fromNow() : moment(r.updatedAt).fromNow()
      };
    });
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
      default:
        return `New Notification - Type: ${ type } Action: ${ action }`;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
