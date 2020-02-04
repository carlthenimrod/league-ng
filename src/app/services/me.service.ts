import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { Me, AuthResponse } from '@app/models/auth';
import { LocalStorageService } from './local-storage.service';
import { Team } from '@app/models/team';
import { League } from '@app/models/league';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  subject = new BehaviorSubject<Me>(null);

  constructor(private localStorage: LocalStorageService) {}

  get$(): Observable<Me> {
    return new Observable(observer => {
      try {
        const me = this.localStorage.get();
        me._id
          ? this.subject.next(me)
          : this.subject.next(null);

        observer.next(me);
        observer.complete();
      } catch {
        observer.error('Unable to retrieve user details from Local Storage');
      }
    });
  }

  set$(value: AuthResponse|Me): Observable<boolean> {
    try {
      const me = this.isMe(value) ? value : this.mapResponse(value);
      this.localStorage.set(me);
      this.subject.next(me);

      return of(true);
    } catch (e) {
      return throwError('Unable to set user details in Local Storage');
    }
  }

  clear() {
    this.subject.next(null);
  }

  private mapResponse(response: AuthResponse): Me {
    return {
      ...response,
      leagues: this.findLeagues(response.teams)
    };
  }

  private findLeagues(teams: Team[]): League[] {
    const leagues: League[] = [];

    teams.forEach(team => {
      team.leagues.forEach(league => {
        // check league is anot already in leagues in array
        if (leagues.findIndex(l => l._id === league._id) === -1) {
          leagues.push(league);
        }
      });
    });

    // sort alphabetically
    leagues.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) { return -1; }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) { return 1; }
      return 0;
    });

    return leagues;
  }

  private isMe(me: AuthResponse | Me): me is Me {
    return (me as Me).leagues !== undefined;
  }
}
