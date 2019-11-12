import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminPlacesRoutingModule } from './admin-places-routing.module';
import { AdminPlacesComponent } from './admin-places.component';
import { AdminPlaceListComponent } from './admin-place-list/admin-place-list.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';
import { AdminPlaceDetailsComponent } from './admin-place/admin-place-details/admin-place-details.component';
import { AdminPlaceHeaderComponent } from './admin-place/admin-place-header/admin-place-header.component';
import { AdminModalPlaceLabelComponent } from './admin-place/admin-place-details/admin-modal-place-label/admin-modal-place-label.component';
import { AdminModalPlaceAddressComponent } from './admin-place/admin-place-details/admin-modal-place-address/admin-modal-place-address.component';
import { AdminModalPlaceLocationComponent } from './admin-place/admin-place-details/admin-modal-place-location/admin-modal-place-location.component';
import { AdminModalPlaceNewComponent } from './admin-place-list/admin-modal-place-new/admin-modal-place-new.component';
import { AdminPlacePermitsComponent } from './admin-place/admin-place-permits/admin-place-permits.component';
import { AdminModalPlacePermitComponent } from './admin-place/admin-place-permits/admin-modal-place-permit/admin-modal-place-permit.component';

@NgModule({
  declarations: [
    AdminPlacesComponent,
    AdminPlaceListComponent,
    AdminPlaceComponent,
    AdminPlaceDetailsComponent,
    AdminPlaceHeaderComponent,
    AdminPlacePermitsComponent,
    AdminModalPlaceLabelComponent,
    AdminModalPlaceAddressComponent,
    AdminModalPlaceLocationComponent,
    AdminModalPlaceNewComponent,
    AdminModalPlacePermitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminSharedModule,
    AdminPlacesRoutingModule
  ],
  entryComponents: [
    AdminModalPlaceLabelComponent,
    AdminModalPlaceAddressComponent,
    AdminModalPlaceLocationComponent,
    AdminModalPlaceNewComponent,
    AdminModalPlacePermitComponent
  ]
})
export class AdminPlacesModule { }
