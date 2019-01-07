import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserScheduleComponent } from './user-schedule/user-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    UserScheduleComponent
  ]
})
export class UserModule { }
