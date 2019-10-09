import { Component, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  editing = false;
  user: User;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.user$().subscribe(user => this.user = user);
  }

  onEdit() {
    this.editing = true;
  }

  onSave() {
    this.editing = false;
  }
}
