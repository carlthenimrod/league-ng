import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Permit } from '@app/models/place';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-modal-permit',
  templateUrl: './admin-modal-permit.component.html',
  styleUrls: ['./admin-modal-permit.component.scss']
})
export class AdminModalPermitComponent implements OnInit {
  permit: Permit;
  permitForm = this.fb.group({
    label: ['', Validators.required]
  });
  new: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { permit: Permit },
    private dialogRef: MatDialogRef<AdminModalPermitComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.new = (!this.data) ? true : false;

    if (!this.new) {
      this.permit = this.data.permit;
      this.permitForm.patchValue(this.permit);
    }
  }

  onSubmit() {
    if (!this.permitForm.valid) { return; }

    let permit: Permit;

    if (this.new) {
      permit = this.permitForm.value;
    } else {
      permit = {
        _id: this.data.permit._id,
        ...this.permitForm.value,
        slots: this.data.permit.slots
      };
    }
    this.dialogRef.close(permit);
  }
}
