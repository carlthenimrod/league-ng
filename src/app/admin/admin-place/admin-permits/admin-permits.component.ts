import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Permit } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';
import { AdminModalPermitComponent } from './admin-modal-permit/admin-modal-permit.component';
import { permitsEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-permits',
  templateUrl: './admin-permits.component.html',
  styleUrls: ['./admin-permits.component.scss'],
  animations: [permitsEnterTrigger]
})
export class AdminPermitsComponent {
  @Input() permits: Permit[];

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService
  ) { }

  onClickAddPermit() {
    const config: MatDialogConfig = {
      autoFocus: false,
      maxWidth: '95vw',
      restoreFocus: false,
      width: '500px'
    };

    const dialog = this.dialog.open(AdminModalPermitComponent, config);

    dialog.afterClosed().subscribe((permit: Permit) => {
      if (!permit) { return; }
      this.placeService.addPermit(permit).subscribe();
    });
  }

  trackById(index: number, permit: Permit) {
    return permit._id;
  }
}
