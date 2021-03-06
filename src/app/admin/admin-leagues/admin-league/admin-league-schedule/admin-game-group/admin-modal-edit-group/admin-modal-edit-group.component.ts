import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GameGroup } from '@app/models/league';

@Component({
  selector: 'admin-modal-edit-group',
  templateUrl: './admin-modal-edit-group.component.html',
  styleUrls: ['./admin-modal-edit-group.component.scss']
})
export class AdminModalEditGroupComponent implements OnInit {
  group: GameGroup;
  groupForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {group: GameGroup},
    private dialogRef: MatDialogRef<AdminModalEditGroupComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.group = this.data.group;
    this.groupForm = this.fb.group({
      label: [this.group.label, Validators.required]
    });
  }

  onSubmit() {
    if (this.groupForm.valid) {
      const label = this.groupForm.value.label;
      this.group.label = label;

      this.dialogRef.close(this.group);
    }
  }
}
