import { Component, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.userListener().subscribe((user: User) => this.user = user);
  }
}
