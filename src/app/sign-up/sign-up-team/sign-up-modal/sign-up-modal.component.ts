import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, filter, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { UIModalService } from '@app/shared/ui/modal/modal.service';

@Component({
  selector: 'ngl-sign-up-modal',
  styleUrls: ['./sign-up-modal.component.scss'],
  templateUrl: './sign-up-modal.component.html'
})
export class SignUpModalComponent implements AfterViewInit {
  addUserForm = this.fb.group({
    _id: [''],
    email: ['', [Validators.required, Validators.email]],
    name: this.fb.group({
      first: [''],
      last: ['']
    }),
    roles: ['', Validators.required]
  });

  get email(): AbstractControl {
    return this.addUserForm.get('email');
  }

  user: Partial<User>;
  searching: boolean;

  constructor(
    private fb: FormBuilder,
    private modal: UIModalService,
    private userService: UserService
  ) { }

  ngAfterViewInit() {
    this.email.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.user = null),
        filter(() => this.email.valid),
        tap(() => this.searching = true),
        switchMap(value => this.userService.search(value))
      )
      .subscribe(this._handleUser.bind(this));
  }

  private _handleUser(user: User) {
    if (user) {
      this.addUserForm.patchValue({
        _id: user._id,
        name: {
          first: user.name.first,
          last: user.name.last
        },
        roles: ['']
      });

      this.addUserForm.get('name').disable();
      this.user = user;
    } else {
      this.addUserForm.get('_id').reset();
      this.addUserForm.get('name').reset();
      this.addUserForm.get('roles').reset();
      this.addUserForm.get('name').enable();

      this.user = { email: this.email.value };
    }

    this.searching = false;
  }

  onSubmit() {
    this.modal.close(this.addUserForm);
  }
}
