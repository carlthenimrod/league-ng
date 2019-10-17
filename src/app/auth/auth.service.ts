import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as _ from 'lodash';

import { LocalStorageService } from '@app/services/local-storage.service';
import { Auth, Me } from '@app/models/auth';
import { League } from '@app/models/league';
import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.api;
  me: Me;
  meSubject = new BehaviorSubject<Me>(null);
  me$ = this.meSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.getMe();
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  setMe(auth: Auth): void {
    const me = this.formatResponse(auth);
    this.localStorage.set(me);
    this.me = me;
    this.meSubject.next(_.cloneDeep(me));
  }

  getMe(): void {
    try {
      this.me = this.localStorage.get();
      this.meSubject.next(_.cloneDeep(this.me));
    } catch {
      this.logout();
    }
  }

  refresh(): Observable<any> {
    const refresh_token: string = localStorage.getItem('refresh_token');
    const client: string = localStorage.getItem('client');

    if (!refresh_token || !client) {
      return throwError('');
    }

    return this.http
      .post<Auth>(this.api + 'auth/refresh', {
        'refresh_token': refresh_token,
        'client': client
      })
      .pipe(
        map(response => this.formatResponse(response)),
        tap(me => this.localStorage.set(me))
      );
  }

  login(email: string, password: string) {
    const url = this.api + 'auth/login';
    return this.http
      .post<Auth>(url, {email, password})
      .pipe(
        map(response => this.formatResponse(response)),
        tap(me => {
          this.localStorage.set(me);
          this.me = me;
          this.meSubject.next(_.cloneDeep(this.me));
        })
      );
  }

  logout() {
    const client = localStorage.getItem('client');
    const refresh_token = localStorage.getItem('refresh_token');

    localStorage.clear();
    this.me = null;
    this.meSubject.next(null);

    const url = this.api + 'auth/logout';
    this.http.request('delete', url, { body: {client, refresh_token}}).subscribe();
  }

  setLoggedIn(auth: Auth) {
    const me = this.formatResponse(auth);
    this.localStorage.set(me);
    this.me = me;
    this.meSubject.next(me);
  }

  formatResponse(auth: Auth): Me {
    const me: Me = {
      _id: auth._id,
      email: auth.email,
      name: auth.name,
      fullName: auth.fullName,
      status: auth.status,
      teams: auth.teams,
      leagues: this.findLeagues(auth.teams),
      client: auth.client,
      access_token: auth.access_token,
      refresh_token: auth.refresh_token
    };

    if (auth.img) { auth.img = auth.img; }

    return me;
  }

  findLeagues(teams: Team[]): League[] {
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
}
