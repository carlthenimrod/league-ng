import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api: string = environment.api;

  constructor(
    private http: HttpClient
  ) {}

  all(): Observable<any> {
    const url = this.api + 'users';
    return this.http.get(url);
  }
}
