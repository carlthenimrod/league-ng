import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as _ from 'lodash';

import { AuthResponse, Me } from '@app/models/auth';
import { MeService } from '@app/services/me.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;
  me$: Observable<Me>;

  constructor(
    private http: HttpClient,
    public me: MeService
  ) {
    this.me$ = this.me.subject.asObservable();

    this.me.get$()
      .pipe(
        catchError(err => {
          this.logout();
          return of(err);
        })
      )
      .subscribe();
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
      .post<AuthResponse>(this.api + 'auth/refresh', {
        'refresh_token': refresh_token,
        'client': client
      })
      .pipe(
        mergeMap(response => this.me.set$(response))
      );
  }

  login(email: string, password: string): Observable<boolean> {
    const url = this.api + 'auth/login';
    return this.http
      .post<AuthResponse>(url, {email, password})
      .pipe(
        mergeMap(response => this.me.set$(response))
      );
  }

  logout() {
    const client = localStorage.getItem('client');
    const refresh_token = localStorage.getItem('refresh_token');

    localStorage.clear();
    this.me.clear();

    const url = this.api + 'auth/logout';
    this.http.request('delete', url, { body: {client, refresh_token}}).subscribe();
  }
}
