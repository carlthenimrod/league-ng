import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'admin-modal-place-address',
  templateUrl: './admin-modal-place-address.component.html'
})
export class AdminModalPlaceAddressComponent implements OnInit {
  place$: Observable<Place>;

  constructor(
    private modal: UIModalService,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.place$ = this.placeService.place$;
  }

  onSubmit(f: NgForm) {
    this.placeService.put$({ address: f.value })
      .subscribe(() => this.modal.close());
  }
}
