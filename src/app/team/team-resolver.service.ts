import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { Me } from '@app/models/auth';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Injectable()
export class TeamResolverService implements Resolve<Team> {
  constructor(
    private auth: AuthService,
    private router: Router,
    private teamService: TeamService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Team> | Observable<never> {
    return this.auth.me$
      .pipe(
        take(1),
        tap(me => !me && this.router.navigateByUrl('/login')),
        mergeMap(me => me
          ? this.getTeam$(me, route.paramMap.get('id'))
          : EMPTY
        )
      );
  }

  getTeam$(me: Me, teamId: string): Observable<Team> | Observable<never> {
    return this.teamService.get$(teamId)
      .pipe(
        mergeMap(team => {
          const roles = this.teamService.getUserRoles(me._id);

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
