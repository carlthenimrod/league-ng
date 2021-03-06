import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { Place } from '@app/models/place';
import { PlaceService } from '@app/services/place.service';

@Component({
  selector: 'admin-modal-place-new',
  templateUrl: './admin-modal-place-new.component.html',
  styleUrls: ['./admin-modal-place-new.component.scss']
})
export class AdminModalPlaceNewComponent {
  placeForm = this.fb.group({
    label: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      postal: ['']
    }),
    locations: this.fb.array([
      this.fb.group({ name: [''] })
    ])
  });

  get locationsArray() {
    return (this.placeForm.get('locations') as FormArray);
  }

  constructor(
    private fb: FormBuilder,
    private modal: UIModalService,
    private placeService: PlaceService,
    private router: Router
  ) { }

  addLocation() {
    if (this.locationsArray.length >= 3) { return; }

    this.locationsArray.push(this.fb.group({
      name: ['']
    }));
  }

  removeLocation(index: number) {
    this.locationsArray.removeAt(index);
  }

  onSubmit(place: Place) {
    place.locations = place.locations.filter(l => l.name.trim());
    this.placeService.post$(place)
      .subscribe(newPlace =>
        this.router.navigate(['admin', 'places', newPlace._id])
          .then(() => this.modal.close())
      );
  }
}
