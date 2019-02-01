import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Permit, Slot } from '@app/models/place';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
  slots: Slot[] = [];
  new: boolean;
  addingTime = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { permit: Permit },
    private dialogRef: MatDialogRef<AdminModalPermitComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.new = (!this.data) ? true : false;

    if (!this.new) {
      this.permit = this.data.permit;
      this.slots = this.permit.slots;
      this.permitForm.patchValue(this.permit);
    }
  }

  onClickAddTime() {
    this.addingTime = true;
  }

  onDatesAdded(dates: Slot[]) {
    this.slots.push(...dates);
    this.addingTime = false;
  }

  onCancelAddingTimes() {
    this.addingTime = false;
  }

  onClickRemoveSlot(i) {
    this.slots.splice(i, 1);
  }

  onSubmit() {
    if (!this.permitForm.valid) { return; }

    let permit: Permit;

    if (this.new) {
      permit = this.permitForm.value;
      permit.slots = this.slots;
    } else {
      permit = {
        _id: this.data.permit._id,
        ...this.permitForm.value,
        slots: this.slots
      };
    }
    this.dialogRef.close(permit);
  }
}
