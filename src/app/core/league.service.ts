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

  get(id: String): Observable<any> {
    const url = this.api + 'leagues/' + id;
    return this.http.get(url);
  }

  save(league: League): Observable<any> {
    if (league._id) { // edit
      const url = this.api + 'leagues/' + league._id;
      return this.http.put(url, league);
    } else { // new
      const url = this.api + 'leagues';
      return this.http.post(url, league);
    }
  }
}
