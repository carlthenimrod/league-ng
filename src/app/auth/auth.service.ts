import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as _ from 'lodash';

import { Auth, Me } from '@app/models/auth';
import { League } from '@app/models/league';
import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = environment.api;
  me: Me;
  meSubject = new BehaviorSubject<Me>(null);
  me$ = this.meSubject.asObservable();

  constructor(private http: HttpClient) {
    if (localStorage.getItem('access_token')) {
      this.me = this.getLocalStorage();
      this.meSubject.next(_.cloneDeep(this.me));
    }
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getLocalStorage(): Me {
    const me: Me = {
      _id: localStorage.getItem('_id'),
      email: localStorage.getItem('email'),
      name: JSON.parse(localStorage.getItem('name')),
      fullName: localStorage.getItem('fullName'),
      status: JSON.parse(localStorage.getItem('status')),
      teams: JSON.parse(localStorage.getItem('teams')),
      leagues: JSON.parse(localStorage.getItem('leagues')),
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      client: localStorage.getItem('client')
    };

    const img = localStorage.getItem('img');
    if (img) { me.img = img; }

    return me;
  }

  setMe(auth: Auth): void {
    const me = this.formatResponse(auth);
    this.setLocalStorage(me);
    this.me = me;
    this.meSubject.next(_.cloneDeep(me));
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
        tap(auth => this.setLocalStorage(auth))
      );
  }

  login(email: string, password: string) {
    const url = this.api + 'auth/login';
    return this.http
      .post<Auth>(url, {email, password})
      .pipe(
        map(response => this.formatResponse(response)),
        tap(me => {
          this.setLocalStorage(me);
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
    this.setLocalStorage(me);
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

  setLocalStorage(me: Me) {
    localStorage.setItem('_id', me._id);
    localStorage.setItem('email', me.email);
    localStorage.setItem('name', JSON.stringify(me.name));
    localStorage.setItem('fullName', me.fullName);
    localStorage.setItem('status', JSON.stringify(me.status));
    localStorage.setItem('teams', JSON.stringify(me.teams));
    localStorage.setItem('leagues', JSON.stringify(me.leagues));
    localStorage.setItem('access_token', me.access_token);
    localStorage.setItem('refresh_token', me.refresh_token);
    localStorage.setItem('client', me.client);

    if (me.img) {
      localStorage.setItem('img', me.img);
    } else {
      localStorage.removeItem('img');
    }
  }
}
