import { Injectable, ComponentFactoryResolver, ComponentFactory, Injector, ComponentRef, Inject, ApplicationRef, EmbeddedViewRef, OnDestroy, ViewRef, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { UserNotificationResponse, UserNotification, UserNotificationReply } from '@app/models/user';
import { UserNotificationsComponent } from '@app/template/header/user-notifications/user-notifications.component';
import { ViewportService } from './viewport.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationsService implements OnDestroy {
  api = environment.api;
  notifications: UserNotification[];
  notificationsSubject: BehaviorSubject<UserNotification[]> = new BehaviorSubject(null);
  unread = false;
  unreadSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  componentRef: ComponentRef<UserNotificationsComponent>;
  headerRef: ViewRef;
  factory: ComponentFactory<UserNotificationsComponent>;
  userId: string;
  vc: ViewContainerRef;
  viewportSub: Subscription;
  viewportType: string;

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private viewport: ViewportService
  ) {
    this.viewportSub = this.viewport.type$().subscribe(type => {
      this.viewportType = type;

      if (this.componentRef) { this.removeNotifications(); }
    });
  }

  get(id: string) {
    this.userId = id;
    const url = this.api + `users/${this.userId}/notifications`;

    this.http.get(url).pipe(
      map((response: UserNotificationResponse[]) => {
        return this.formatResponse(response);
      })
    ).subscribe(notifications => {
      this.notifications = notifications;
      this.notificationsSubject.next(notifications);
    });
  }

  formatResponse(notifications: UserNotificationResponse[]): UserNotification[] {
    const userNotifications: UserNotification[] = [];

    for (let i = 0; i < notifications.length; i++) {
      const {_id, type, action, team, user, status} = notifications[i];

      switch (type) {
        case 'invite':
          if (action === 'request') {
            userNotifications.push({
              _id,
              type,
              action,
              team,
              message: `${team.name} has invited you.`,
              status
            });
          }
          break;
      }

      if (!status.read) {
        this.unread = true;
        this.unreadSubject.next(true);
      }
    }

    return userNotifications;
  }

  $notifications() {
    return this.notificationsSubject.asObservable();
  }

  $unread() {
    return this.unreadSubject.asObservable();
  }

  toggleNotifications(vc: ViewContainerRef) {
    if (!this.vc) { this.vc = vc; }

    if (!this.factory) {
      this.factory = this.resolver.resolveComponentFactory(UserNotificationsComponent);
    }

    if (!this.componentRef) {
      this.createNotifications();
    } else {
      this.removeNotifications();
    }
  }

  createNotifications() {
    this.componentRef = this.factory.create(this.injector);
    this.componentRef.instance.notifications = this.notifications;

    this.componentRef.instance.reply.subscribe((notificationReply: UserNotificationReply) => {
      this.handleReply(notificationReply);
    });

    if (this.viewportType === 'mobile') {
      this.appRef.attachView(this.componentRef.hostView);

      const componentView = this.componentRef.hostView as EmbeddedViewRef<UserNotificationsComponent>;
      const domEl = componentView.rootNodes[0];

      this.document.body.appendChild(domEl);
    } else {
      this.vc.insert(this.componentRef.hostView);
    }

    if (this.unread) { this.markRead(); }
  }

  removeNotifications() {
    this.componentRef.destroy();
    delete this.componentRef;
  }

  markRead() {
    const url = this.api + `users/${this.userId}/notifications/read`;

    this.http.post(url, {}).pipe(
      map((response: UserNotificationResponse[]) => {
        return this.formatResponse(response);
      })
    ).subscribe(notifications => {
      this.unread = false;
      this.unreadSubject.next(false);

      this.notifications = notifications;
      this.notificationsSubject.next(notifications);
    });
  }

  handleReply(notificationReply: UserNotificationReply) {
    const {notification, reply} = notificationReply;

    if (notification.type === 'invite') {
      const team = notification.team;

      const url = this.api + `teams/${team._id}/invite/${reply}`;
      this.http.post(url, {}).subscribe(() => {
        console.log(reply);
      });
    }
  }

  ngOnDestroy() {
    this.viewportSub.unsubscribe();
  }
}
