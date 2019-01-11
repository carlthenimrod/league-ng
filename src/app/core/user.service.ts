import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import _ from 'lodash';

import { User } from '@app/models/user';
import { Auth } from '@app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = environment.api;

  user: User;
  userSubject: Subject<User> = new Subject<User>();

  constructor(
    private http: HttpClient
  ) {}

  all(): Observable<any> {
    const url = this.api + 'users';
    return this.http.get(url);
  }

  get(id: String): void {
    const url = this.api + `users/${id}`;
    this.http.get(url).subscribe((user: User) => {
      this.user = user;
      this.userSubject.next(_.cloneDeep(this.user));
    });
  }

  userListener(): Observable<User> {
    return this.userSubject.asObservable();
  }

  save(user: User): Observable<any> {
    if (user._id) {
      const url = this.api + `users/${user._id}`;
      return this.http.put(url, user);
    } else {
      const url = this.api + 'users';
      return this.http.post(url, user);
    }
  }

  delete(id: String): Observable<any> {
    const url = this.api + `users/${id}`;
    return this.http.delete(url);
  }

  checkEmail(email: string) {
    const url = this.api + `users/email`;
    return this.http.post(url, {email});
  }

  confirmEmail(userId: string, code: string) {
    const url = this.api + `users/${userId}/confirm`;
    return this.http.post(url, {code});
  }

  createPassword(userId: string, code: string, password: string) {
    const url = this.api + `users/${userId}/password`;
    return this.http.post(url, {password, code}).pipe(
      tap((auth: Auth) => {
        localStorage.setItem('_id', auth._id);
        localStorage.setItem('email', auth.email);
        localStorage.setItem('access_token', auth.access_token);
        localStorage.setItem('refresh_token', auth.refresh_token);
        localStorage.setItem('client', auth.client);
      })
    );
  }
}
