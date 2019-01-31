import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { PlaceLocation } from '@app/models/place';
import { AdminModalAddLocationComponent } from './admin-modal-add-location/admin-modal-add-location.component';
import { PlaceService } from '@app/core/place.service';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './admin-locations.component.html',
  styleUrls: ['./admin-locations.component.scss']
})
export class AdminLocationsComponent implements OnInit {
  @Input() locations: PlaceLocation[];

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
  }

  onClickAddLocation(): void {
    const config: MatDialogConfig = {
      autoFocus: false,
      maxWidth: '95vw',
      restoreFocus: false,
      width: '500px'
    };

    const dialog = this.dialog.open(AdminModalAddLocationComponent, config);

    dialog.afterClosed().subscribe((location: PlaceLocation) => {
      if (!location) { return; }
      this.placeService.addLocation(location).subscribe();
    });
  }

  onClickEditLocation(location: PlaceLocation): void {
    const config: MatDialogConfig = {
      autoFocus: false,
      data: {location},
      maxWidth: '95vw',
      restoreFocus: false,
      width: '500px'
    };

    const dialog = this.dialog.open(AdminModalAddLocationComponent, config);

    dialog.afterClosed().subscribe((updatedLocation: PlaceLocation) => {
      if (!updatedLocation) { return; }
      this.placeService.updateLocation(updatedLocation).subscribe();
    });
  }

  onClickDeleteLocation(location: PlaceLocation): void {
    const name = prompt('Warning: Cannot be undone! Enter location name to confirm:');

    if (!name) { return; }

    if (location.name === name.trim()) {
      this.placeService.deleteLocation(location._id).subscribe();
    } else {
      alert('Error: Location name entered doesn\'t match.');
    }
  }
}
