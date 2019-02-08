import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { Place } from '@app/models/place';
import { PlaceService } from '@app/core/place.service';

@Component({
  selector: 'app-admin-place-form',
  templateUrl: './admin-place-form.component.html',
  styleUrls: ['./admin-place-form.component.scss']
})
export class AdminPlaceFormComponent implements OnInit {
  @Input() place: Place;
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  placeForm: FormGroup;

  get locations () {
    return this.placeForm.get('locations') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.place) {
      this.placeForm = this.fb.group({
        name: [this.place.name, Validators.required],
        address: this.fb.group({
          street: [this.place.address.street],
          city: [this.place.address.city],
          state: [this.place.address.state],
          postal: [this.place.address.postal]
        }),
        locations: this.fb.array([])
      });

      if (this.place.locations.length > 0) {
        for (let i = 0; i < this.place.locations.length; i++) {
          const location = this.place.locations[i];
          this.locations.push(this.fb.group({ name: [location.name], _id: [location._id] }));
        }
      } else {
        this.locations.push(this.fb.group({ name: [''] }));
      }
    } else {
      this.placeForm = this.fb.group({
        name: ['', Validators.required],
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
    }
  }

  addLocation() {
    this.locations.push(this.fb.group({ name: [''] }));
  }

  removeLocation(i: number) {
    this.locations.removeAt(i);
  }

  onSubmit() {
    if (!this.placeForm.valid) { return; }

    const place: Place = {...this.placeForm.value};

    place.locations = place.locations.filter(l => {
      if (l.name.trim() !== '') { return l; }
    });

    if (this.place) {
      place._id = this.place._id;

      this.placeService.update(place).subscribe(() => {
        this.saveClick.emit(true);
      });
    } else {
      this.placeService.create(place).subscribe((createdPlace: Place) => {
        this.router.navigate(['admin', 'places', createdPlace._id]);
      });
    }
  }

  onCancel() {
    this.cancelClick.emit(false);
  }
}
