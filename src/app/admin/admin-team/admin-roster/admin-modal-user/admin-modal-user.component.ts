import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl } from '@angular/forms';

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
      this.userForm.addControl('name', new FormControl(''));

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

  displayFn(user: User): string | undefined {
    return user ? user.name : undefined;
  }

  onClickRemoveUser() {
    this.teamService.removeUser(this.data.userId);
  }

  onSubmit() {
    const {name, roles} = this.userForm.value;

    if (typeof name === 'object') { // existing
      this.user = name;
    } else { // new
      this.user = { name };
    }

    this.dialogRef.close({user: this.user, roles});
  }
}
