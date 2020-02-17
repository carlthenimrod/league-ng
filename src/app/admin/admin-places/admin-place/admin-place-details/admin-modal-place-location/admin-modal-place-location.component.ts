import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ModalService } from '@app/shared/modal/modal.service';
import { MODAL_DATA } from '@app/shared/modal/modal';
import { Place, Location } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'admin-modal-location',
  templateUrl: './admin-modal-place-location.component.html'
})
export class AdminModalPlaceLocationComponent implements OnInit {
  delete: boolean;
  edit: boolean;
  location: Location;
  place$: Observable<Place>;

  constructor(
    @Inject(MODAL_DATA) private data: { _id?: string, delete?: boolean },
    private modal: ModalService,
    private placeService: PlaceService
  ) {}

  ngOnInit() {
    this.place$ = this.placeService.place$
      .pipe(tap(this.setLocation.bind(this)));
  }

  setLocation(place: Place) {
    const _id = this.data._id;
    this.delete = _id && this.data.delete ? true : false;
    this.edit = _id && !this.delete ? true : false;

    const match = place.locations.find(l => l._id === _id);
    this.location = match ? match : { name: '' };
  }

  onSubmit(f: NgForm, locations: Location[]) {
    const data = this.delete
      ? locations.filter(l => l._id !== this.location._id)
      : !this.edit
      ? [...locations, f.value]
      : locations.map(l => l._id === this.location._id ? {...l, ...f.value} : l);

    this.placeService.put$({ locations: data })
      .subscribe(() => this.modal.close());
  }
}
