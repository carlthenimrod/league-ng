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
import { UserDetailsComponent } from './user-dashboard/user-details/user-details.component';
import { UserModalPasswordComponent } from './user-dashboard/user-details/user-modal-password/user-modal-password.component';
import { UserResolverService } from './user-resolver.service';

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
    UserFormComponent,
    UserDetailsComponent,
    UserModalPasswordComponent
  ],
  entryComponents: [
    UserModalPasswordComponent
  ],
  providers: [UserResolverService]
})
export class UserModule { }
