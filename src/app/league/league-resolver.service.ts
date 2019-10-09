import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { LeagueService } from '@app/services/league.service';
import { League } from '@app/models/league';
import { AuthService } from '@app/auth/auth.service';

export class LeagueResolver implements Resolve<League> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private leagueService: LeagueService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<League> {
    const leagueId = route.paramMap.get('id');

    return this.authService.loggedIn$().pipe(
      take(1),
      tap(loggedIn => !loggedIn && this.router.navigateByUrl('/logout')),
      mergeMap(loggedIn => loggedIn && this.inLeague(leagueId)
        ? this.leagueService.get(leagueId)
        : EMPTY
      )
    );
  }

  inLeague(leagueId: string): boolean {
    const auth = this.authService.getAuth();
    for (let i = 0; i < auth.leagues.length; i++) {
      const league = auth.leagues[i];

      if (league._id !== leagueId) { continue; }
      return true;
    }
    return false;
  }
}
