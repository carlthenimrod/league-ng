import { Component, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';

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
    this.userService.all().subscribe((users: User[]) => {
      this.users = users;
      this.userList = users;
    });
  }

  onResults(users: User[]) {
    this.userList = users;
  }
}
