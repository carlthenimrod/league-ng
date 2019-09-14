import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

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
    const id = route.paramMap.get('id');

    return this.authService.loggedIn$().pipe(
      take(1),
      mergeMap(loggedIn => {
        if (!loggedIn) { this.router.navigateByUrl('/logout'); }

        const auth = this.authService.getAuth();
        for (let i = 0; i < auth.leagues.length; i++) {
          const league = auth.leagues[i];

          if (league._id !== id) { continue; }
          return this.leagueService.get(id);
        }

        this.router.navigateByUrl('/logout');
        return EMPTY;
      })
    );
  }
}
