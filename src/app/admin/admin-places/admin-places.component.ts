import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'app-admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.scss']
})
export class AdminPlacesComponent implements OnInit {
  places$: Observable<Place[]>;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.places$ = this.placeService.get$();
  }
}
