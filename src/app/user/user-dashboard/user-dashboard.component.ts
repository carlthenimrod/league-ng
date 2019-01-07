import { Component, Input, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Input() user: User;
  tab = 'schedule';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.get('5c32abf3f3c6f02470d2054e');
    this.userService.userListener().subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
