import { Component, Input, Injector } from '@angular/core';

import { Place } from '@app/models/place';
import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { AdminModalPlaceLabelComponent } from './admin-modal-place-label/admin-modal-place-label.component';
import { AdminModalPlaceAddressComponent } from './admin-modal-place-address/admin-modal-place-address.component';
import { AdminModalPlaceLocationComponent } from './admin-modal-place-location/admin-modal-place-location.component';

@Component({
  selector: 'admin-place-details',
  templateUrl: './admin-place-details.component.html'
})
export class AdminPlaceDetailsComponent {
  @Input() place: Place;

  constructor(
    private injector: Injector,
    private modal: UIModalService
  ) { }

  onClickOpenModal(e: Event, type: string, _id?: string) {
    e.stopPropagation();

    switch (type) {
      case 'label':
        this.modal.open(AdminModalPlaceLabelComponent, {
          injector: this.injector
        });
        break;
      case 'address':
        this.modal.open(AdminModalPlaceAddressComponent, {
          injector: this.injector
        });
        break;
      case 'addLocation':
        this.modal.open(AdminModalPlaceLocationComponent, {
          injector: this.injector
        });
        break;
      case 'editLocation':
        this.modal.open(AdminModalPlaceLocationComponent, {
          injector: this.injector,
          data: { _id }
        });
        break;
      case 'deleteLocation':
        this.modal.open(AdminModalPlaceLocationComponent, {
          injector: this.injector,
          data: { _id, delete: true }
        });
        break;
    }
  }
}
