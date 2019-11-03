import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'app-admin-place',
  templateUrl: './admin-place.component.html',
  styleUrls: ['./admin-place.component.scss'],
  providers: [PlaceService]
})
export class AdminPlaceComponent implements OnInit {
  place$: Observable<Place>;
  selected = 'details';

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.place$ = this.route.paramMap.pipe(
      switchMap(params => this.placeService.get$(params.get('id'))),
      switchMap(() => this.placeService.place$)
    );
  }
}
