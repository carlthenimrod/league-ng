import { Component, Input, HostBinding } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Notification } from '@app/models/notification';

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
}
