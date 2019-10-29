import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminPlacesRoutingModule } from './admin-places-routing.module';
import { AdminPlacesComponent } from './admin-places.component';
import { AdminPlaceListComponent } from './admin-place-list/admin-place-list.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';
import { AdminPlaceDetailsComponent } from './admin-place/admin-place-details/admin-place-details.component';
import { AdminPlaceFormComponent } from './admin-place/admin-place-form/admin-place-form.component';
import { AdminPermitsComponent } from './admin-place/admin-permits/admin-permits.component';
import { AdminPermitComponent } from './admin-place/admin-permits/admin-permit/admin-permit.component';

@NgModule({
  declarations: [
    AdminPlacesComponent,
    AdminPlaceListComponent,
    AdminPlaceComponent,
    AdminPlaceDetailsComponent,
    AdminPlaceFormComponent,
    AdminPermitsComponent,
    AdminPermitComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AdminPlacesRoutingModule
  ]
})
export class AdminPlacesModule { }
