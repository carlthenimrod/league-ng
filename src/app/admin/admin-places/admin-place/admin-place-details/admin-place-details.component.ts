import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'app-admin-place-details',
  templateUrl: './admin-place-details.component.html',
  styleUrls: ['./admin-place-details.component.scss']
})
export class AdminPlaceDetailsComponent implements OnInit {
  @Input() place: Place;
  @Output('editClick') editClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private placeService: PlaceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.emit(true);
  }

  onDeleteClick() {
    const name = prompt('Warning: Cannot be undone! Enter place name to confirm:');

    if (!name) { return; }

    if (this.place.name === name.trim()) {
      this.placeService.delete(this.place._id).subscribe(() => {
        this.router.navigate(['/', 'admin', 'places']);
      });
    } else {
      alert('Error: Place name entered doesn\'t match.');
    }
  }
}
