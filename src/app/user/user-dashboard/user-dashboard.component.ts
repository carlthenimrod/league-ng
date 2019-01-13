import { Component, OnInit } from '@angular/core';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';
import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  editing = false;
  user: User;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn()) {
      const auth: Auth = this.auth.getAuth();

      this.userService.get(auth._id);
      this.userService.userListener().subscribe((user: User) => this.user = user);
    } else {
      this.router.navigateByUrl('login');
    }
  }

  onEdit() {
    this.editing = true;
  }

  onSave() {
    this.editing = false;
  }
}
