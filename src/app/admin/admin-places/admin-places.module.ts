import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminPlacesRoutingModule } from './admin-places-routing.module';
import { AdminPlacesComponent } from './admin-places.component';
import { AdminPlaceListComponent } from './admin-place-list/admin-place-list.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';
import { AdminPlaceDetailsComponent } from './admin-place/admin-place-details/admin-place-details.component';
import { AdminPlaceFormComponent } from './admin-place/admin-place-form/admin-place-form.component';
import { AdminPermitsComponent } from './admin-place/admin-permits/admin-permits.component';
import { AdminPermitComponent } from './admin-place/admin-permits/admin-permit/admin-permit.component';
import { AdminModalTimeComponent } from './admin-place/admin-permits/admin-permit/admin-modal-time/admin-modal-time.component';
import { AdminModalPermitComponent } from './admin-place/admin-permits/admin-modal-permit/admin-modal-permit.component';
import { AdminPlaceHeaderComponent } from './admin-place/admin-place-header/admin-place-header.component';
import { AdminModalPlaceLabelComponent } from './admin-place/admin-place-details/admin-modal-place-label/admin-modal-place-label.component';

@NgModule({
  declarations: [
    AdminPlacesComponent,
    AdminPlaceListComponent,
    AdminPlaceComponent,
    AdminPlaceDetailsComponent,
    AdminPlaceFormComponent,
    AdminPermitsComponent,
    AdminPermitComponent,
    AdminModalPermitComponent,
    AdminModalTimeComponent,
    AdminPlaceHeaderComponent,
    AdminModalPlaceLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminPlacesRoutingModule
  ],
  entryComponents: [
    AdminModalPermitComponent,
    AdminModalTimeComponent,
    AdminModalPlaceLabelComponent
  ]
})
export class AdminPlacesModule { }
