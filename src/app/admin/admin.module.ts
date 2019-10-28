import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-leagues/admin-dashboard/admin-dashboard.component';
import { AdminUtilityComponent } from './admin-utility/admin-utility.component';
import { AdminPaginationComponent } from './admin-utility/admin-pagination/admin-pagination.component';
import { AdminSearchComponent } from './admin-utility/admin-search/admin-search.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserDetailsComponent } from './admin-user/admin-user-details/admin-user-details.component';
import { AdminUserFormComponent } from './admin-user/admin-user-form/admin-user-form.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';
import { AdminPlaceFormComponent } from './admin-place/admin-place-form/admin-place-form.component';
import { AdminPlaceDetailsComponent } from './admin-place/admin-place-details/admin-place-details.component';
import { AdminPermitsComponent } from './admin-place/admin-permits/admin-permits.component';
import { AdminModalPermitComponent } from './admin-place/admin-permits/admin-modal-permit/admin-modal-permit.component';
import { AdminTimeAdderComponent } from './admin-place/admin-permits/admin-modal-permit/admin-time-adder/admin-time-adder.component';
import { AdminPermitComponent } from './admin-place/admin-permits/admin-permit/admin-permit.component';
import { AdminModalTimeComponent } from './admin-place/admin-permits/admin-permit/admin-modal-time/admin-modal-time.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminUtilityComponent,
    AdminPaginationComponent,
    AdminSearchComponent,
    AdminUsersComponent,
    AdminUserComponent,
    AdminUserDetailsComponent,
    AdminUserFormComponent,
    AdminPlacesComponent,
    AdminPlaceComponent,
    AdminPlaceFormComponent,
    AdminPlaceDetailsComponent,
    AdminPermitsComponent,
    AdminModalPermitComponent,
    AdminTimeAdderComponent,
    AdminPermitComponent,
    AdminModalTimeComponent
  ],
  entryComponents: [
    AdminModalPermitComponent,
    AdminModalTimeComponent
  ]
})
export class AdminModule { }
