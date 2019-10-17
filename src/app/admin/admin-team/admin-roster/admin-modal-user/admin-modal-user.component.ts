import { Component, OnInit, Inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

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
      this.userService.get().subscribe(users =>
        this.autocompleteOptions = this.filterUsers(users)
      );
    }
  }

  filterUsers(users: User[]) {
    const filteredUsers: User[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (this.team.users.some(u => u._id === user._id)) { continue; }

      filteredUsers.push(user);
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
