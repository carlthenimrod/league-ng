import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';
import { Team } from '@app/models/team';


@Component({
  selector: 'app-admin-modal-user',
  templateUrl: './admin-modal-user.component.html',
  styleUrls: ['./admin-modal-user.component.scss']
})
export class AdminModalUserComponent implements OnInit {
  team: Team;
  user: User;
  autocompleteOptions: User[];
  userForm = this.fb.group({
    name: [],
    roles: []
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { team: Team, user?: User},
    private dialogRef: MatDialogRef<AdminModalUserComponent>,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.team = this.data.team;

    this.userService.all().subscribe((users: User[]) => {
      this.autocompleteOptions = this.filterUsers(users);
    });
  }

  filterUsers(users: User[]) {
    const filteredUsers: User[] = [];

    for (let i = 0; i < users.length; i++) {
      const u = users[i];

      if (this.team.players.some(p => p._id === u._id)) { return; }
      if (this.team.managers.some(p => p._id === u._id)) { return; }
      if (this.team.coaches.some(p => p._id === u._id)) { return; }

      filteredUsers.push(u);
    }

    return filteredUsers;
  }

  displayFn(user: User): string | undefined {
    return user ? user.name : undefined;
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
