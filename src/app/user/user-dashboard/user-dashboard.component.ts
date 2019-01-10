import { Component, Input, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';
import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Input() user: User;
  tab = 'schedule';

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const auth: Auth = this.auth.getAuth();

    this.userService.get(auth._id);
    this.userService.userListener().subscribe((user: User) => this.user = user);
  }
}
