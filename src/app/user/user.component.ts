import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '@app/models/auth';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
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
}
