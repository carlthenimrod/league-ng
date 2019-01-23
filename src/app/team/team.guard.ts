import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';

import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';
import { AuthService } from '@app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private teamService: TeamService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    if (!this.auth.loggedIn) { this.router.navigateByUrl('/login'); }

    const teamId = next.params.id;
    const userId = this.auth.getAuth()._id;

    return Observable.create((obs: Observer<boolean>) => {
      this.teamService.get(teamId).subscribe((team: Team) => {
        const roles = this.teamService.getUserRoles(userId);

        (roles.length > 0) ? obs.next(true) : obs.next(false);
      }, () => {
        obs.next(false);
      });
    });
  }
}
