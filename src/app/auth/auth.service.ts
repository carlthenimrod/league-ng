import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Auth } from '@app/models/auth';
import { SocketService } from '@app/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = environment.api;

  constructor(
    private http: HttpClient,
    private socket: SocketService
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
    return this.http.post(url, {email, password}).pipe(
      tap((auth: Auth) => {
        localStorage.setItem('_id', auth._id);
        localStorage.setItem('email', auth.email);
        localStorage.setItem('access_token', auth.access_token);
        localStorage.setItem('refresh_token', auth.refresh_token);
        localStorage.setItem('client', auth.client);
        this.socket.connect(auth);
      })
    );
  }

  loggedIn(): boolean {
    return (localStorage.getItem('access_token')) ? true : false;
  }

  logout() {
    const client = localStorage.getItem('client');
    const refresh_token = localStorage.getItem('refresh_token');

    localStorage.removeItem('_id');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('client');
    this.socket.disconnect();

    const url = this.api + 'auth/logout';
    this.http.request('delete', url, { body: {client, refresh_token}}).subscribe();
  }
}
