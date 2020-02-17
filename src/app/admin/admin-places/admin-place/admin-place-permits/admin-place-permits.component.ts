import { Component, Input } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { Place } from '@app/models/place';
import { AdminModalPlacePermitComponent } from './admin-modal-place-permit/admin-modal-place-permit.component';

@Component({
  selector: 'admin-place-permits',
  templateUrl: './admin-place-permits.component.html',
  styleUrls: ['./admin-place-permits.component.scss']
})
export class AdminPlacePermitsComponent {
  @Input() place: Place;

  constructor(private modal: ModalService) { }

  onClickOpenModal() {
    this.modal.open(AdminModalPlacePermitComponent);
  }
}
