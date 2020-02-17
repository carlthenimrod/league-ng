import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';
import { UIModalService } from '@app/shared/ui/modal/modal.service';

@Component({
  selector: 'admin-modal-place-label',
  templateUrl: './admin-modal-place-label.component.html'
})
export class AdminModalPlaceLabelComponent implements OnInit {
  place$: Observable<Place>;

  constructor(
    private modal: UIModalService,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.place$ = this.placeService.place$;
  }

  onSubmit(f: NgForm) {
    this.placeService.put$(f.value)
      .subscribe(() => this.modal.close());
  }
}
