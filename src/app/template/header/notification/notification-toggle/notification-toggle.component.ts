import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';

import { NotificationService } from '../notification.service';

@Component({
  selector: 'ngl-notification-toggle',
  styleUrls: ['./notification-toggle.component.scss'],
  template: `
    <button (click)="onClick()">
      <span *ngIf="unread$ | async" @unread></span>
      <i class="fas fa-bell"></i>
    </button>
  `,
  animations: [
    trigger('unread', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('500ms ease-in-out', style({ transform: 'scale(1.2)' })),
        animate('200ms ease-in-out', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class NotificationToggleComponent implements OnInit {
  @Output() clicked = new EventEmitter<void>();
  unread$: Observable<boolean>;

  constructor(
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.unread$ = this._notificationService.unread$;
  }

  onClick() {
    this.clicked.emit();
  }
}
