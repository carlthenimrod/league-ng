import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';
import { AdminModalPlaceNewComponent } from './admin-modal-place-new/admin-modal-place-new.component';

@Component({
  selector: 'admin-place-list',
  templateUrl: './admin-place-list.component.html'
})
export class AdminPlaceListComponent implements OnInit {
  places$: Observable<Place[]>;

  constructor(
    private modal: UIModalService,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.places$ = this.placeService.get$();
  }

  onClickOpenModal() {
    this.modal.open(AdminModalPlaceNewComponent);
  }
}
