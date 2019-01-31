import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Permit } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';
import { AdminModalPermitComponent } from './admin-modal-permit/admin-modal-permit.component';

@Component({
  selector: 'app-admin-permits',
  templateUrl: './admin-permits.component.html',
  styleUrls: ['./admin-permits.component.scss']
})
export class AdminPermitsComponent implements OnInit {
  @Input() permits: Permit[];

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
  }

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

  onClickEditPermit(permit: Permit): void {
    const config: MatDialogConfig = {
      autoFocus: false,
      data: {permit},
      maxWidth: '95vw',
      restoreFocus: false,
      width: '500px'
    };

    const dialog = this.dialog.open(AdminModalPermitComponent, config);

    dialog.afterClosed().subscribe((updatedPermit: Permit) => {
      if (!updatedPermit) { return; }
      this.placeService.updatePermit(updatedPermit).subscribe();
    });
  }

  onClickDeletePermit(permit: Permit): void {
    const label = prompt('Warning: Cannot be undone! Enter permit label to confirm:');

    if (!label) { return; }

    if (permit.label === label.trim()) {
      this.placeService.deletePermit(permit._id).subscribe();
    } else {
      alert('Error: Permit label entered doesn\'t match.');
    }
  }
}
