import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { Notification } from '@app/models/notification';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'ngl-notification-item',
  styleUrls: ['./notification-item.component.scss'],
  templateUrl: './notification-item.component.html',
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0 ,
          transform: 'scale(0.9)'
        }),
        animate('100ms ease-out', style({ height: '*' })),
        animate('100ms ease-out', style({ opacity: 1 })),
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class NotificationItemComponent {
  @Input() notification: Notification;
  @HostBinding('@enter') enter;
  get status() {
    return this.notification && this.notification.status;
  }
  get showActions(): boolean {
    return typeof this.status.pending === 'boolean'
      ? true
      : false;
  }

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onClick(accepted: boolean) {
    this.notificationService.put$(this.notification,
      {
        status: {
          pending: false,
          accepted
        }
      }
    )
      .subscribe(n =>
        this.router.navigate(['/team', n.team._id])
          .then(() => this.notificationService.close())
      );
  }
}
