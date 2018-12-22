import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-add-player',
  templateUrl: './modal-add-player.component.html',
  styleUrls: ['./modal-add-player.component.scss']
})
export class ModalAddPlayerComponent implements OnInit {
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    roles: ['']
  });

  constructor(
    private dialogRef: MatDialogRef<ModalAddPlayerComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
