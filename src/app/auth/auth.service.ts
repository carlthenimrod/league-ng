import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Auth } from '@app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = environment.api;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getAuth(): Auth {
    return {
      _id: localStorage.getItem('_id'),
      email: localStorage.getItem('email'),
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      client: localStorage.getItem('client')
    };
  }

  refresh(): Observable<any> {
    const refresh_token: string = localStorage.getItem('refresh_token');
    const client: string = localStorage.getItem('client');

    if (!refresh_token || !client) {
      return throwError('');
    }

    return this.http.post(this.api + 'users/refresh', {
      'refresh_token': refresh_token,
      'client': client
    })
      .pipe(
        map((res: { access_token: string }) => res.access_token),
        tap((access_token: string) => {
          localStorage.setItem('access_token', access_token);
        })
      );
  }

  login(email: string, password: string) {
    const url = this.api + 'auth/login';
    this.http.post(url, {email, password}).subscribe(() => {

    });
  }

  logout() {
    localStorage.removeItem('_id');
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('client');

    this.router.navigateByUrl('login', { skipLocationChange: true });
  }
}
