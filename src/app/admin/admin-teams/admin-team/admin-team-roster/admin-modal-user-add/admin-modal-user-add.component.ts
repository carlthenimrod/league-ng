import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { emailUnique } from '@app/validators/email-unique.validator';

@Component({
  selector: 'app-admin-modal-user-add',
  styleUrls: ['./admin-modal-user-add.component.scss'],
  templateUrl: './admin-modal-user-add.component.html',
  providers: [UserService]
})
export class AdminModalUserAddComponent implements OnInit, OnDestroy {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], emailUnique(this.userService)],
    name: this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    }),
    roles: ['', Validators.required]
  });
  options: User[];
  selectedUser: User;
  team$: Observable<Team>;
  users$: Observable<User[]>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.team$ = this.teamService.team$;
    this.users$ = this.userService.get$();

    combineLatest([
      this.team$,
      this.users$,
      this.userForm.get('email').valueChanges
    ])
    .pipe(
      map(([team, users, value]: [Team, User[], string]) =>
        this.filter(team, users, value)
      ),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(options => this.options = options);
  }

  filter(team: Team, users: User[], value: string): User[] {
    if (!value || (value.trim() === '')) { return []; }
    const search = value.toLowerCase();

    return users.filter(user => {
      if (!user.email || !user.fullName) { return; }

      const email = user.email.toLowerCase();
      const name = user.fullName.toLowerCase();

      if (email.includes(search) || name.includes(search)) {
        const index = team.users.findIndex(u => u._id === user._id);
        return index === -1 ? true : false;
      }
    });
  }

  onSelect(user: User) {
    this.selectedUser = user;

    this.userForm.get('email').disable();
    this.userForm.get('email').clearAsyncValidators();
    this.userForm.get('name.first').disable();
    this.userForm.get('name.last').disable();

    this.userForm.patchValue({
      email: user.email,
      name: {
        first: user.name.first,
        last: user.name.last
      }
    });
  }

  onClickClearSelected() {
    delete this.selectedUser;

    this.userForm.reset();
    this.userForm.get('email').enable();
    this.userForm.get('email').setAsyncValidators(emailUnique(this.userService));
    this.userForm.get('name.first').enable();
    this.userForm.get('name.last').enable();
  }

  onSubmit(user: User) {
    const obs = !this.selectedUser
      ? this.userService.post$(user)
          .pipe(
            switchMap(createdUser =>
              this.teamService.userPost$({ ...createdUser, roles: user.roles })
            )
          )
      : this.teamService.userPost$({ ...user, _id: this.selectedUser._id});

    obs.subscribe(() => this.modal.close());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
