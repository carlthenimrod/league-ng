import { Component, OnInit } from '@angular/core';
import { trigger, stagger, query, animateChild, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';

import { Notification } from '@app/models/notification';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'ngl-notification-list',
  styles: [`
    :host {
      display: block;
      height: 100%;
      overflow-y: scroll;
      padding: 0 1rem 1rem 1rem;
    }

    p#no-notifications {
      color: #fff;
      margin: 0;
      padding: 2rem 0 1rem 0;
      text-align: center;
    }
  `],
  templateUrl: './notification-list.component.html',
  animations: [
    trigger('enterList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('200ms ease-in-out', [
            animateChild()
          ])
        ], { optional: true })
      ])
    ]),
    trigger('enterParagraph', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.9)'
        }),
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class NotificationListComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notifications$ = this.notificationService.notifications$;
  }

  protected _trackBy(_, notification: Notification) {
    return notification._id;
  }
}
