import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.scss']
})
export class AdminUserFormComponent implements OnInit {
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user: User;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      phone: [''],
      secondary: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postal: ['']
      }),
      emergency: this.fb.group({
        name: this.fb.group({
          first: [''],
          last: ['']
        }),
        phone: [''],
        secondary: ['']
      })
    });

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (!this.userForm.valid) { return; }

    if (this.user) {
      const user: User = {
        _id: this.user._id,
        ...this.userForm.value
      };

      this.userService.update(user).subscribe(() => {
        this.saveClick.emit(true);
      });
    } else {
      const user: User = {...this.userForm.value};

      this.userService.create(user).subscribe((createdUser: User) => {
        this.router.navigate(['admin', 'users', createdUser._id]);
      });
    }
  }

  onCancel() {
    this.cancelClick.emit(false);
  }
}
