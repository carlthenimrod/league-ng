import { Component } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query } from '@angular/animations';

import { UIModalComponent } from '@app/shared/ui/modal/modal.component';

@Component({
  selector: 'ngl-notification',
  styleUrls: ['./notification.component.scss'],
  template: `
    <ngl-notification-filter></ngl-notification-filter>
    <ngl-notification-list></ngl-notification-list>
  `,
  animations: [
    trigger('lightbox', [
      transition(':enter', [
        query('@enterList', [
          animateChild()
        ], { optional: true }),
        query('@enterParagraph', [
          animateChild()
        ], { optional: true })
      ])
    ])
  ]
})
export class NotificationComponent extends UIModalComponent { }
