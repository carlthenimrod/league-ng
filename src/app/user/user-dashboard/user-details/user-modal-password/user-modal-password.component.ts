import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';

import { UserService } from '@app/core/user.service';
import { confirmPassword } from '@app/validators/password-confirm.validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.touched && form.control.hasError('notSame') || (isSubmitted && form.control.hasError('notSame')));
  }
}

@Component({
  selector: 'app-user-modal-password',
  templateUrl: './user-modal-password.component.html',
  styleUrls: ['./user-modal-password.component.scss']
})
export class UserModalPasswordComponent implements OnInit {
  passwordForm = this.fb.group({
    old: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirm: ['', Validators.required],
  }, {
    validator: confirmPassword
  });
  matcher = new MyErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<UserModalPasswordComponent>,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close();
  }
}
