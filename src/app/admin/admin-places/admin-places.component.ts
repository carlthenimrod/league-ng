import { Component, OnInit } from '@angular/core';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';

@Component({
  selector: 'app-admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.scss']
})
export class AdminPlacesComponent implements OnInit {
  places: Place[];

  constructor(
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.placeService.all().subscribe((places: Place[]) => {
      this.places = places;
    });
  }
}
