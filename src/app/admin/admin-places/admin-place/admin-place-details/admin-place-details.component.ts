import { Component, Input, Injector } from '@angular/core';

import { DialogService } from '@app/shared/dialog/dialog.service';
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
    private dialog: DialogService,
    private injector: Injector
  ) { }

  onClickOpenDialog(type: string) {
    switch (type) {
      case 'label':
        this.dialog.open(AdminModalPlaceLabelComponent, this.injector);
        break;
    }
  }
}
