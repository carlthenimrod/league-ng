import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { DialogService } from '@app/shared/dialog/dialog.service';
import { PlaceService } from '@app/services/place.service';
import { Place } from '@app/models/place';

@Component({
  selector: 'app-admin-modal-place-label',
  templateUrl: './admin-modal-place-label.component.html',
  styleUrls: ['./admin-modal-place-label.component.scss']
})
export class AdminModalPlaceLabelComponent implements OnInit {
  place$: Observable<Place>;

  constructor(
    private dialogService: DialogService,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.place$ = this.placeService.place$;
  }

  onSubmit(f: NgForm) {
    if (!f.valid) { return; }

    this.placeService.put$(f.value)
      .subscribe(() => this.dialogService.close());
  }
}
