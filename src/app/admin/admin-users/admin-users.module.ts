import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserDetailsComponent } from './admin-user/admin-user-details/admin-user-details.component';
import { AdminUserAdditionalComponent } from './admin-user/admin-user-additional/admin-user-additional.component';
import { AdminModalUserNewComponent } from './admin-user-list/admin-modal-user-new/admin-modal-user-new.component';
import { AdminModalUserDeleteComponent } from './admin-user/admin-modal-user-delete/admin-modal-user-delete.component';
import { AdminModalUserNameComponent } from './admin-user/admin-user-details/admin-modal-user-name/admin-modal-user-name.component';
import { AdminModalUserAddressComponent } from './admin-user/admin-user-details/admin-modal-user-address/admin-modal-user-address.component';
import { AdminModalUserPhoneComponent } from './admin-user/admin-user-details/admin-modal-user-phone/admin-modal-user-phone.component';
import { AdminModalUserCommentsComponent } from './admin-user/admin-user-additional/admin-modal-user-comments/admin-modal-user-comments.component';
import { AdminModalUserEmergencyComponent } from './admin-user/admin-user-additional/admin-modal-user-emergency/admin-modal-user-emergency.component';

@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminUserComponent,
    AdminUserListComponent,
    AdminUserDetailsComponent,
    AdminUserAdditionalComponent,
    AdminModalUserNewComponent,
    AdminModalUserDeleteComponent,
    AdminModalUserNameComponent,
    AdminModalUserAddressComponent,
    AdminModalUserPhoneComponent,
    AdminModalUserEmergencyComponent,
    AdminModalUserCommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminSharedModule,
    AdminUsersRoutingModule
  ],
  entryComponents: [
    AdminModalUserNewComponent,
    AdminModalUserDeleteComponent,
    AdminModalUserNameComponent,
    AdminModalUserAddressComponent,
    AdminModalUserPhoneComponent,
    AdminModalUserEmergencyComponent,
    AdminModalUserCommentsComponent
  ]
})
export class AdminUsersModule { }
