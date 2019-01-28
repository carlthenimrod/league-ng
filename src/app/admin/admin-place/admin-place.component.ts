import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';

@Component({
  selector: 'app-admin-place',
  templateUrl: './admin-place.component.html',
  styleUrls: ['./admin-place.component.scss']
})
export class AdminPlaceComponent implements OnInit, OnDestroy {
  place: Place;
  placeSubscription: Subscription;
  editingPlace = false;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.placeSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.placeService.get(params.get('id'));
        return this.placeService.placeListener();
      })
    )
    .subscribe((place: Place) => this.place = place);
  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe();
  }
}
