import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';

@Component({
  selector: 'app-admin-modal-user',
  templateUrl: './admin-modal-user.component.html',
  styleUrls: ['./admin-modal-user.component.scss']
})
export class AdminModalUserComponent implements OnInit {
  team: Team;
  user: User;
  new: boolean;
  autocompleteOptions: User[];
  userForm = this.fb.group({
    roles: []
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { team: Team, userId?: string},
    private dialogRef: MatDialogRef<AdminModalUserComponent>,
    private fb: FormBuilder,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.team = this.data.team;

    // check if adding new user
    if (this.data.userId) {
      this.new = false;

      // get roles
      const roles = this.teamService.getUserRoles(this.data.userId);

      // set form value
      this.userForm.controls['roles'].setValue(roles);
    } else {
      this.new = true;

      // add name
      // this.userForm.addControl('name', new FormControl(''));
      this.userForm.addControl('name', this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }));

      // get all users for auto-complete
      this.userService.all().subscribe((users: User[]) => {
        this.autocompleteOptions = this.filterUsers(users);
      });
    }
  }

  filterUsers(users: User[]) {
    const filteredUsers: User[] = [];

    for (let i = 0; i < users.length; i++) {
      const u = users[i];

      if (this.team.players.some(p => p._id === u._id)) { continue; }
      if (this.team.managers.some(m => m._id === u._id)) { continue; }
      if (this.team.coaches.some(c => c._id === u._id)) { continue; }

      filteredUsers.push(u);
    }

    return filteredUsers;
  }

  onClickRemoveUser() {
    this.teamService.removeUser(this.data.userId);
  }

  onSelect(e: MatAutocompleteSelectedEvent) {
    const user: User = e.option.value;

    this.user = user;

    this.userForm.get('name').patchValue(user.name);
  }

  onSubmit() {
    const {name, roles} = this.userForm.value;

    // new user
    if (!this.user) { this.user = { name }; }

    this.dialogRef.close({user: this.user, roles});
  }
}
