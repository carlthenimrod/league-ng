import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { iif, forkJoin, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { TeamService } from '@app/services/team.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { emailUnique } from '@app/validators/email-unique.validator';
import { TeamExistsValidator } from '@app/validators/team-exists.validator';

@Component({
  selector: 'ngl-sign-up',
  styleUrls: ['./sign-up.component.scss'],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    type: [''],
    user: this.fb.group({
      name: this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      email: ['', [Validators.required, Validators.email], emailUnique(this.userService)],
      phone: ['', Validators.required],
      secondary: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postal: ['', Validators.required]
      })
    }),
    misc: this.fb.group({
      emergency: this.fb.group({
        name: this.fb.group({
          first: ['', Validators.required],
          last: ['', Validators.required]
        }),
        phone: ['', Validators.required],
        secondary: ['']
      }),
      comments: ['']
    })
  });
  complete = false;
  submitted = false;

  get type(): AbstractControl {
    return (this.signUpForm.controls['type'] as AbstractControl);
  }

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private teamExists: TeamExistsValidator,
    private userService: UserService
  ) { }

  onSelect(type: string) {
    this.type.setValue(type);

    if (type === 'team') {
      this.signUpForm.addControl('team', this._createTeamCtrl());
    } else {
      this.signUpForm.removeControl('team');
    }
  }

  private _createTeamCtrl(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required, this.teamExists.validate.bind(this.teamExists)],
      roster: this.fb.array([])
    });
  }

  addSelf() {
    const roster = (this.signUpForm.get('team.roster')) as FormArray;

    const self = this.fb.group({
      email: [this.signUpForm.get('user.email').value],
      name: this.fb.group({
        first: [this.signUpForm.get('user.name.first').value],
        last: [this.signUpForm.get('user.name.last').value]
      }),
      roles: [['manager']]
    });

    self.disable();

    if (roster.length > 0) {
      roster.removeAt(0);
      roster.insert(0, self);
    } else {
      roster.push(self);
    }
  }

  private _createUsers(newUser: User) {
    const users: User[] = (this.signUpForm.get('team.roster') as FormArray).getRawValue();
    const users$: Observable<{ user: string, roles: string[] }>[] = [];

    users.forEach((user, index) => {
      if (index === 0) {
        users$.push(
          of({ user: newUser._id, roles: user.roles })
        );

        return;
      }

      if (user._id) {
        users$.push(
          of({ user: user._id, roles: user.roles })
        );

        return;
      }

      users$.push(this.userService.post$(user)
        .pipe(
          map(u => {
            return {
              user: u._id,
              roles: user.roles
            };
          })
        )
      );
    });

    return forkJoin(users$);
  }

  onSubmit() {
    this.submitted = true;

    const user: User = {
      ...this.signUpForm.get('user').value,
      emergency: this.signUpForm.get('misc.emergency').value,
      comments: this.signUpForm.get('misc.comments').value
    };

    iif(
      () => this.type.value === 'user',
      this.userService.post$(user),
      this.userService.post$(user)
        .pipe(
          concatMap(this._createUsers.bind(this)),
          concatMap(users => this.teamService.post$({
            name: this.signUpForm.get('team.name').value,
            roster: [users.shift()],
            pending: users,
            status: { new: true }
          }))
        )
    )
      .subscribe(() => this.complete = true);
  }
}
