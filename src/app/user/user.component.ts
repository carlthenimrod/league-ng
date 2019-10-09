import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.loggedIn$()
      .pipe(take(1))
      .subscribe(loggedIn => {
        if (!loggedIn) { this.router.navigateByUrl('login'); }
        const auth: Auth = this.authService.getAuth();

        this.userService.get(auth._id);
        this.userService.user$().subscribe((user: User) => this.user = user);
      });
  }
}
