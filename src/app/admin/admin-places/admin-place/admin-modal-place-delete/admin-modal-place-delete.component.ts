import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PlaceService } from '@app/services/place.service';
import { Place } from '@app/models/place';
import { UIModalService } from '@app/shared/ui/modal/modal.service';

@Component({
  selector: 'admin-modal-place-delete',
  templateUrl: './admin-modal-place-delete.component.html'
})
export class AdminModalPlaceDeleteComponent implements OnInit {
  place$: Observable<Place>;

  constructor(
    private modal: UIModalService,
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
