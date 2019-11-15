import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ModalService } from '@app/shared/modal/modal.service';
import { PlaceService } from '@app/services/place.service';
import { Place } from '@app/models/place';

@Component({
  selector: 'app-admin-modal-place-delete',
  templateUrl: './admin-modal-place-delete.component.html'
})
export class AdminModalPlaceDeleteComponent implements OnInit {
  place$: Observable<Place>;

  constructor(
    private modal: ModalService,
    private placeService: PlaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.place$ = this.placeService.place$;
  }

  onSubmit() {
    this.placeService.delete$()
      .subscribe(() => {
        this.router.navigateByUrl('/admin/places');
        this.modal.close();
      });
  }
}
