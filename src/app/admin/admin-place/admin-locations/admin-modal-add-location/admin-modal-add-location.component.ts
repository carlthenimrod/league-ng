import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlaceLocation } from '@app/models/place';

@Component({
  selector: 'app-admin-modal-add-location',
  templateUrl: './admin-modal-add-location.component.html',
  styleUrls: ['./admin-modal-add-location.component.scss']
})
export class AdminModalAddLocationComponent implements OnInit {
  locationForm = this.fb.group({
    name: ['', Validators.required]
  });
  new: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { location: PlaceLocation },
    private dialogRef: MatDialogRef<AdminModalAddLocationComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.new = (!this.data) ? true : false;

    if (!this.new) {
      const location = this.data.location;
      this.locationForm.patchValue(location);
    }
  }

  onSubmit() {
    if (!this.locationForm.valid) { return; }

    let location: PlaceLocation;

    if (this.new) {
      location = this.locationForm.value;
    } else {
      location = {
        _id: this.data.location._id,
        ...this.locationForm.value
      };
    }
    this.dialogRef.close(location);
  }
}
