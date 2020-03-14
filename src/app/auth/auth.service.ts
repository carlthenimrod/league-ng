import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, merge } from 'rxjs';
import { mergeMap, catchError, filter, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as _ from 'lodash';

import { AuthResponse, Me } from '@app/models/auth';
import { League } from '@app/models/league';
import { LocalStorageService } from '@app/services/local-storage.service';
import { SocketService } from '@app/services/socket.service';
import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _api = environment.api;

  private _meSubject = new BehaviorSubject<Me>(null);
  private _me: Me;
  me$ = this._meSubject.asObservable();

  constructor(
    private http: HttpClient,
    private _localStorage: LocalStorageService,
    private _socket: SocketService,
  ) {
    this.get$()
      .subscribe(
        () => this._socket.connect(),
        () => this.logout()
      );

    merge(
      this._socket.authorized$,
      this._socket.user$
        .pipe(
          filter(d => d.action === 'selfUpdate'),
          map(d => d.user)
        )
    )
    .pipe(
      map(this._mapResponse.bind(this))
    )
    .subscribe(this.set$.bind(this));
  }

  get$(): Observable<Me> {
    return new Observable(observer => {
      try {
        const me = this._localStorage.get();
        me._id
          ? this._meSubject.next(me)
          : this._meSubject.next(null);

        observer.next(me);
        observer.complete();
      } catch {
        observer.error('Unable to retrieve user details from Local Storage');
      }
    });
  }

  set$(value: AuthResponse|Me): Observable<boolean> {
    try {
      const me = this.isMe(value) ? value : this._mapResponse(value);
      this._localStorage.set(me);
      this._meSubject.next(me);

      return of(true);
    } catch (e) {
      return throwError('Unable to set user details in Local Storage');
    }
  }

  private _mapResponse(response: AuthResponse): Me {
    return {
      ...response,
      leagues: this._findLeagues(response.teams)
    };
  }

  private _findLeagues(teams: Team[]): League[] {
    const leagues: League[] = [];

    teams.forEach(team =>
      team.leagues.forEach(league => {
        // check league is not already in leagues in array
        if (leagues.findIndex(l => l._id === league._id) === -1) {
          leagues.push(league);
        }
      })
    );

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

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  refresh(): Observable<any> {
    const refresh_token: string = localStorage.getItem('refresh_token');
    const client: string = localStorage.getItem('client');

    if (!refresh_token || !client) {
      return throwError('');
    }

    return this.http
      .post<AuthResponse>(this._api + 'auth/refresh', {
        'refresh_token': refresh_token,
        'client': client
      })
      .pipe(
        mergeMap(response => this.set$(response))
      );
  }

  login(email: string, password: string): Observable<boolean> {
    const url = this._api + 'auth/login';
    return this.http
      .post<AuthResponse>(url, {email, password})
      .pipe(
        mergeMap(response => this.set$(response))
      );
  }

  logout() {
    const client = localStorage.getItem('client');
    const refresh_token = localStorage.getItem('refresh_token');

    localStorage.clear();
    this._meSubject.next(null);

    const url = this._api + 'auth/logout';
    this.http.request('delete', url, { body: {client, refresh_token}}).subscribe();
  }
}
