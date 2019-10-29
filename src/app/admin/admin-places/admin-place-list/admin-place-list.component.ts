import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'app-admin-place-list',
  templateUrl: './admin-place-list.component.html',
  styleUrls: ['./admin-place-list.component.scss']
})
export class AdminPlaceListComponent implements OnInit {
  places$: Observable<Place[]>;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.places$ = this.placeService.get$();
  }
}
