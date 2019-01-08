import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserScheduleComponent } from './user-schedule/user-schedule.component';
import { UserFormComponent } from './user-dashboard/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    UserScheduleComponent,
    UserFormComponent
  ]
})
export class UserModule { }
