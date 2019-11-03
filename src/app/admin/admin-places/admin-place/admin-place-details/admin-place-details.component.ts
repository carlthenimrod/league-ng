import { Component, Input, Injector } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { Place } from '@app/models/place';
import { AdminModalPlaceLabelComponent } from './admin-modal-place-label/admin-modal-place-label.component';

@Component({
  selector: 'app-admin-place-details',
  templateUrl: './admin-place-details.component.html',
  styleUrls: ['./admin-place-details.component.scss']
})
export class AdminPlaceDetailsComponent {
  @Input() place: Place;

  constructor(
    private injector: Injector,
    private modal: ModalService
  ) { }

  onClickOpenModal(type: string) {
    switch (type) {
      case 'label':
        this.modal.open(AdminModalPlaceLabelComponent, this.injector);
        break;
      case 'address':
        this.modal.open(AdminModalPlaceLabelComponent, this.injector);
        break;
    }
  }
}
