import { Component, Input } from '@angular/core';

import { Place } from '@app/models/place';
import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { AdminModalPlacePermitComponent } from './admin-modal-place-permit/admin-modal-place-permit.component';

@Component({
  selector: 'admin-place-permits',
  templateUrl: './admin-place-permits.component.html',
  styleUrls: ['./admin-place-permits.component.scss']
})
export class AdminPlacePermitsComponent {
  @Input() place: Place;

  constructor(private modal: UIModalService) { }

  onClickOpenModal() {
    this.modal.open(AdminModalPlacePermitComponent);
  }
}
