import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postal: ['']
      })
    });

    if (this.place) {
      this.placeForm.patchValue(this.place);
    }
  }

  onSubmit() {
    if (!this.placeForm.valid) { return; }

    if (this.place) {
      const place: Place = {
        _id: this.place._id,
        ...this.placeForm.value
      };

      this.placeService.update(place).subscribe(() => {
        this.saveClick.emit(true);
      });
    } else {
      const place: Place = {...this.placeForm.value};

      this.placeService.create(place).subscribe((createdPlace: Place) => {
        this.router.navigate(['admin', 'places', createdPlace._id]);
      });
    }
  }

  onCancel() {
    this.cancelClick.emit(false);
  }
}
