import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { iif, forkJoin, Observable, of } from 'rxjs';
import { concatMap, defaultIfEmpty, map, tap } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { emailUnique } from '@app/validators/email-unique.validator';

@Component({
  selector: 'ngl-sign-up',
  styleUrls: ['/sign-up.component.scss'],
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
      name: ['', Validators.required],
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

  private _createRoster(newUser: User) {
    const users: User[] = (this.signUpForm.get('team.roster') as FormArray).getRawValue();
    const roster: Observable<{ user: string, roles: string[] }>[] = [];

    users.forEach((user, index) => {
      if (index === 0) {
        roster.push(
          of({ user: newUser._id, roles: user.roles })
        );

        return;
      }

      if (user._id) {
        roster.push(
          of({ user: user._id, roles: user.roles })
        );

        return;
      }

      roster.push(this.userService.post$(user)
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

    return forkJoin(roster);
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
          concatMap(this._createRoster.bind(this)),
          tap(roster => console.log(roster)),
          concatMap(roster => this.teamService.post$({
            name: this.signUpForm.get('team.name').value,
            roster: roster,
            status: { new: true }
          }))
        )
    )
      .subscribe(() => this.complete = true);
  }
}
