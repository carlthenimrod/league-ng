import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';

import { notificationToggleTrigger } from './animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [notificationToggleTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnChanges {

  @Input() total: number;
  label: number | string;

  constructor() { }

  ngOnInit() {
    this.updateLabel();
  }

  ngOnChanges() {
    this.updateLabel();
  }

  updateLabel() {
    if (this.total < 100) {
      this.label = this.total;
    } else {
      this.label = '99+';
    }
  }
}
