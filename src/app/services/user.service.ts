import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { AuthService } from '@app/auth/auth.service';
import { AuthResponse } from '@app/models/auth';
import { User } from '@app/models/user';
import { ProfileImg } from '@app/models/profile-img';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = environment.api;
  user: User;
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {}

  get$(): Observable<User[]>;
  get$(id: string): Observable<User>;
  get$(id?: string) {
    const url = `${this.api}users/${id ? `/${id}` : ``}`;

    return id
      ? this.http.get<User>(url)
        .pipe(
          tap(user => {
            this.user = user;
            this.userSubject.next(_.cloneDeep(this.user));
          })
        )
      : this.http.get<User[]>(url);
  }

  post$(user: User): Observable<User> {
    const url = `${this.api}users`;
    return this.http.post<User>(url, user)
      .pipe(
        tap(newUser => {
          this.user = newUser;
          this.userSubject.next(_.cloneDeep(this.user));
        })
      );
  }

  put$(user: Partial<User>): Observable<User> {
    const url = `${this.api}users/${this.user._id}`;
    return this.http.put<User>(url, { ...this.user, ...user })
      .pipe(
        tap(updatedUser => {
          this.user = updatedUser;
          this.userSubject.next(_.cloneDeep(this.user));
        })
      );
  }

  delete$(): Observable<void> {
    const url = `${this.api}users/${this.user._id}`;
    return this.http.delete<void>(url)
      .pipe(
        tap(() => {
          this.user = null;
          this.userSubject.next(null);
        })
      );
  }

  create(user: User): Observable<any> {
    const url = this.api + 'users';
    return this.http.post(url, user);
  }

  update(user: User): Observable<any> {
    const url = this.api + `users/${user._id}`;
    return this.http.put(url, user).pipe(
      tap((updatedUser: User) => {
        this.user = updatedUser;
        this.userSubject.next(_.cloneDeep(this.user));
      })
    );
  }

  delete(id: string): Observable<any> {
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
    return this.http.post<AuthResponse>(url, { password, code })
      .pipe(
        tap(response => this.auth.me.set$(response))
      );
  }

  updatePassword(old, password) {
    const url = this.api + `users/${this.user._id}/password`;
    return this.http.put(url, {old, password});
  }

  recoverPassword(email) {
    const url = this.api + 'users/recover';
    return this.http.post(url, {email});
  }

  updateImg(file: File, img: ProfileImg) {
    const data = new FormData();
    data.append('height', img.dimensions.height.toString());
    data.append('width', img.dimensions.width.toString());
    data.append('x', (-img.pos.x.current).toString());
    data.append('y', (-img.pos.y.current).toString());
    data.append('img', file);

    const url = this.api + `users/${this.user._id}/img`;
    return this.http.post(url, data).pipe(
      tap((user: User) => {
        this.user.img = user.img;
        this.userSubject.next(_.cloneDeep(this.user));
      })
    );
  }

  search(email: string) {
    const url = this.api + `users/search`;
    return this.http.post(url, { email });
  }
}
