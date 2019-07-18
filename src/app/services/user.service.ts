import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import _ from 'lodash';

import { SocketService } from './socket.service';
import { User } from '@app/models/user';
import { Auth } from '@app/models/auth';
import { ProfileImg } from '@app/models/profile-img';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = environment.api;

  user: User;
  userSubject: Subject<User> = new Subject<User>();

  constructor(
    private http: HttpClient,
    private socket: SocketService
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
    return this.http.post(url, {password, code}).pipe(
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
