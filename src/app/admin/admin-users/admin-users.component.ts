import { Component, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  userList: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.get().subscribe(users => {
      this.users = users;
      this.userList = users;
    });
  }

  onResults(users: User[]) {
    this.userList = users;
  }
}
