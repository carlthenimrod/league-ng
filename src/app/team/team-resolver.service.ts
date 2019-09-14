import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { AuthService } from '@app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamResolverService implements Resolve<Team> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private teamService: TeamService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<Team> {
    this.authService.loggedIn$()
      .pipe(take(1))
      .subscribe(loggedIn => {
        if (!loggedIn) { this.router.navigateByUrl('/login'); }
      });

    const teamId = route.paramMap.get('id');
    const userId = this.authService.getAuth()._id;

    return this.teamService.get(teamId).pipe(
      take(1),
      mergeMap((team: Team) => {
        const roles = this.teamService.getUserRoles(userId);

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
