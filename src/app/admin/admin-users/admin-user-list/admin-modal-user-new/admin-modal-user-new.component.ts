import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { emailUnique } from '@app/validators/email-unique.validator';

@Component({
  selector: 'admin-modal-user-new',
  templateUrl: './admin-modal-user-new.component.html'
})
export class AdminModalUserNewComponent {
  userForm = this.fb.group({
    name: this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    }),
    email: ['', [Validators.required, Validators.email], emailUnique(this.userService)],
    phone: [''],
    secondary: ['']
  });

  addressForm = this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    postal: ['']
  });

  emergencyForm = this.fb.group({
    name: this.fb.group({
      first: [''],
      last: ['']
    }),
    phone: [''],
    secondary: ['']
  });

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {
    if (!this.userForm.valid) { return; }

    const user: User = {
      ...this.userForm.value,
      address: { ...this.addressForm.value },
      emergency: { ...this.emergencyForm.value }
    };

    this.userService.post$(user)
      .subscribe(newUser =>
        this.router.navigate(['admin', 'users', newUser._id])
          .then(() => this.modal.close())
      );
  }
}
