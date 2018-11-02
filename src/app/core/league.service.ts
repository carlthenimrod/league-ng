import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';
import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  api: string = environment.api;

  constructor(public http: HttpClient) { }

  all(): Observable<any> {
    const url = this.api + 'leagues';
    return this.http.get(url);
  }

  get(id: String): Observable<any> {
    const url = this.api + `leagues/${id}`;
    return this.http.get(url);
  }

  save(league: League): Observable<any> {
    if (league._id) {
      const url = this.api + `leagues/${league._id}`;
      return this.http.put(url, league);
    } else {
      const url = this.api + 'leagues';
      return this.http.post(url, league);
    }
  }

  delete(id: String): Observable<any> {
    const url = this.api + `leagues/${id}`;
    return this.http.delete(url);
  }

  addTeam(id: String, team: Team): Observable<any> {
    const url = this.api + `leagues/${id}/teams`;
    return this.http.post(url, team);
  }

  removeTeam(id: String, teamId: String): Observable<any> {
    const url = this.api + `leagues/${id}/teams/${teamId}`;
    return this.http.delete(url);
  }
}
