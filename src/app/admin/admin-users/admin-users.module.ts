import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserDetailsComponent } from './admin-user/admin-user-details/admin-user-details.component';
import { AdminUserFormComponent } from './admin-user/admin-user-form/admin-user-form.component';

@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminUserComponent,
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule { }
