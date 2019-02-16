import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Permit } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';
import { AdminModalPermitComponent } from '../admin-modal-permit/admin-modal-permit.component';
import { AdminModalTimeComponent } from './admin-modal-time/admin-modal-time.component';
import { slotsEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-permit',
  templateUrl: './admin-permit.component.html',
  styleUrls: ['./admin-permit.component.scss'],
  animations: [slotsEnterTrigger]
})
export class AdminPermitComponent {
  @Input() permit: Permit;
  slots: boolean;

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService
  ) { }

  onClickToggleSlots() {
    this.slots = !this.slots;
  }

  onClickEditPermit(event: MouseEvent, permit: Permit): void {
    event.stopPropagation();

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

  onClickDeletePermit(event: MouseEvent, permit: Permit): void {
    event.stopPropagation();

    const label = prompt('Warning: Cannot be undone! Enter permit label to confirm:');

    if (!label) { return; }

    if (permit.label === label.trim()) {
      this.placeService.deletePermit(permit._id).subscribe();
    } else {
      alert('Error: Permit label entered doesn\'t match.');
    }
  }

  onClickAddTimes(permit: Permit) {
    const config: MatDialogConfig = {
      autoFocus: false,
      data: {permit},
      maxWidth: '95vw',
      restoreFocus: false,
      width: '500px'
    };

    const dialog = this.dialog.open(AdminModalTimeComponent, config);

    dialog.afterClosed().subscribe((updatedPermit: Permit) => {
      if (!updatedPermit) { return; }
      this.placeService.updatePermit(updatedPermit).subscribe();
    });
  }

  onClickClearTimes(permitId: string): void {
    if (confirm('Are you sure you want to clear all times?')) {
      this.placeService.clearPermitSlots(permitId).subscribe();
    }
  }

  onClickRemoveSlot(id: string) {
    console.log(id);
  }

  trackById(index: number, permit: Permit) {
    return permit._id;
  }
}
