import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { Me } from '@app/models/auth';

@Injectable()
export class LeagueResolver implements Resolve<League> {
  constructor(
    private auth: AuthService,
    private router: Router,
    private leagueService: LeagueService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<League> | Observable<never> {
    const leagueId = route.paramMap.get('id');

    return this.auth.me$
      .pipe(
        take(1),
        tap(me => !me && this.router.navigateByUrl('/logout')),
        mergeMap(me => me && this.inLeague(me, leagueId)
          ? this.leagueService.get$(leagueId)
          : EMPTY
        )
      );
  }

  inLeague(me: Me, leagueId: string): boolean {
    for (let i = 0; i < me.leagues.length; i++) {
      const league = me.leagues[i];

      if (league._id !== leagueId) { continue; }
      return true;
    }
    return false;
  }
}
