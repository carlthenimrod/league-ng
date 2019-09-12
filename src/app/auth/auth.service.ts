import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';

import { AuthResponse, Auth } from '@app/models/auth';
import { League } from '@app/models/league';
import { Team } from '@app/models/team';
import { SocketService } from '@app/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = environment.api;
  loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private socket: SocketService
  ) {
    if (localStorage.getItem('access_token')) {
      this.loggedInSubject.next(true);
    } else {
      this.loggedInSubject.next(false);
    }
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getAuth(): Auth {
    const auth: Auth = {
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
    if (img) { auth.img = img; }

    return auth;
  }

  refresh(): Observable<any> {
    const refresh_token: string = localStorage.getItem('refresh_token');
    const client: string = localStorage.getItem('client');

    if (!refresh_token || !client) {
      return throwError('');
    }

    return this.http
      .post<AuthResponse>(this.api + 'auth/refresh', {
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
      .post<AuthResponse>(url, {email, password})
      .pipe(
        map(response => this.formatResponse(response)),
        tap(auth => {
          this.setLocalStorage(auth);
          this.loggedInSubject.next(true);
          this.socket.connect(auth);
        })
      );
  }

  logout() {
    const client = localStorage.getItem('client');
    const refresh_token = localStorage.getItem('refresh_token');

    localStorage.clear();
    this.socket.disconnect();
    this.loggedInSubject.next(false);

    const url = this.api + 'auth/logout';
    this.http.request('delete', url, { body: {client, refresh_token}}).subscribe();
  }

  loggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  formatResponse(response: AuthResponse): Auth {
    const auth: Auth = {
      _id: response._id,
      email: response.email,
      name: response.name,
      fullName: response.fullName,
      status: response.status,
      teams: response.teams,
      leagues: this.findLeagues(response.teams),
      client: response.client,
      access_token: response.access_token,
      refresh_token: response.refresh_token
    };

    if (response.img) { auth.img = response.img; }

    return auth;
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

  setLocalStorage(auth: Auth) {
    localStorage.setItem('_id', auth._id);
    localStorage.setItem('email', auth.email);
    localStorage.setItem('name', JSON.stringify(auth.name));
    localStorage.setItem('fullName', auth.fullName);
    localStorage.setItem('status', JSON.stringify(auth.status));
    localStorage.setItem('teams', JSON.stringify(auth.teams));
    localStorage.setItem('leagues', JSON.stringify(auth.leagues));
    localStorage.setItem('access_token', auth.access_token);
    localStorage.setItem('refresh_token', auth.refresh_token);
    localStorage.setItem('client', auth.client);

    if (auth.img) {
      localStorage.setItem('img', auth.img);
    } else {
      localStorage.removeItem('img');
    }
  }
}
