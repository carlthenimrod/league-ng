import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { AuthService } from '@app/auth/auth.service';

export class TeamResolverService implements Resolve<Team> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private teamService: TeamService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Team> | Observable<never> {
    return this.authService.loggedIn$()
      .pipe(
        take(1),
        tap(loggedIn => !loggedIn && this.router.navigateByUrl('/login')),
        mergeMap(loggedIn => loggedIn
          ? this.getTeam$(route.paramMap.get('id'))
          : EMPTY
        )
      );
  }

  getTeam$(teamId: string): Observable<Team> | Observable<never> {
    return this.teamService.get(teamId)
      .pipe(
        mergeMap(team => {
          const roles = this.teamService.getUserRoles(this.authService.getAuth()._id);

          if (roles.length > 0) {
            return of(team);
          } else {
            this.router.navigateByUrl('/user');
            return EMPTY;
          }
        })
    );
  }
}
