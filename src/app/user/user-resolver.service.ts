import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(): Observable<User> | Observable<never> {
    return this.auth.me$
      .pipe(
        take(1),
        tap(me => !me && this.router.navigateByUrl('/login')),
        mergeMap(me => me
          ? this.userService.get(me._id)
          : EMPTY
        )
      );
  }
}
