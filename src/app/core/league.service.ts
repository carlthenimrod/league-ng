import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  api: string = environment.api;

  constructor(private http: HttpClient) { }

  all(): Observable<any> {
    const url = this.api + 'leagues';

    return this.http.get(url);
  }
}
