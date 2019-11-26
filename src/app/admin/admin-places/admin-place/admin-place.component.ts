import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ModalService } from '@app/shared/modal/modal.service';
import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';
import { AdminModalPlaceDeleteComponent } from './admin-modal-place-delete/admin-modal-place-delete.component';

@Component({
  selector: 'app-admin-place',
  templateUrl: './admin-place.component.html',
  providers: [PlaceService]
})
export class AdminPlaceComponent implements OnInit {
  place$: Observable<Place>;
  selected = 'details';
  settings = false;

  constructor(
    private injector: Injector,
    private modal: ModalService,
    private placeService: PlaceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.place$ = this.route.paramMap.pipe(
      switchMap(params => this.placeService.get$(params.get('id'))),
      switchMap(() => this.placeService.place$)
    );
  }

  onClickOpenModal() {
    this.modal.open(AdminModalPlaceDeleteComponent, {
      injector: this.injector
    });
  }
}
