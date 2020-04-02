import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { NotificationComponent } from './notification.component';
import { NotificationToggleComponent } from './notification-toggle/notification-toggle.component';
import { NotificationFilterComponent } from './notification-filter/notification-filter.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationToggleComponent,
    NotificationFilterComponent,
    NotificationListComponent,
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NotificationToggleComponent
  ]
})
export class NotificationModule { }
