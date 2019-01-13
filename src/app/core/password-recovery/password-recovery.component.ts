import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../user.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  recoverForm = this.fb.group({
    email: ['', Validators.email]
  });
  passwordSent: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  onSubmit() {
    if (!this.recoverForm.valid) { return; }

    const email = this.recoverForm.value.email;

    this.userService.recoverPassword(email).subscribe(() => {
      this.passwordSent = true;
    }, () => {
      this.passwordSent = true;
    });
  }
}
