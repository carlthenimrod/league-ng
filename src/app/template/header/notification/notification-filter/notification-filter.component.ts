import { Component } from '@angular/core';

import { NotificationService } from '../notification.service';

@Component({
  selector: 'ngl-notification-filter',
  styleUrls: ['./notification-filter.component.scss'],
  templateUrl: './notification-filter.component.html'
})
export class NotificationFilterComponent {
  selected: string[] = ['admin', 'league', 'team', 'user'];

  constructor(private notificationService: NotificationService) { }

  toggleFilter(value: string): void {
    this.selected = this.selected.includes(value)
      ? this.selected.filter(f => f !== value)
      : this.selected.concat(value);

    this.notificationService.filter(this.selected);
  }
}
