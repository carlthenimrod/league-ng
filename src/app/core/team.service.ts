import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import _ from 'lodash';

import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  api: string = environment.api;

  team: Team;
  teamSubject: Subject<Team> = new Subject<Team>();

  constructor(public http: HttpClient) { }

  all(): Observable<any> {
    const url = this.api + 'teams';
    return this.http.get(url);
  }

  get(id: String): void {
    const url = this.api + `teams/${id}`;
    this.http.get(url).subscribe((team: Team) => {
      this.team = team;
      this.teamSubject.next(_.cloneDeep(this.team));
    });
  }

  teamListener(): Observable<Team> {
    return this.teamSubject.asObservable();
  }

  save(team: Team, leagueId?: string, divisionId?: string): Observable<any> {
    const data = {
      ...team,
      leagueId,
      divisionId
    };

    if (team._id) {
      const url = this.api + `teams/${team._id}`;
      return this.http.put(url, data);
    } else {
      const url = this.api + 'teams';
      return this.http.post(url, data);
    }
  }

  delete(id: String): Observable<any> {
    const url = this.api + `teams/${id}`;
    return this.http.delete(url);
  }
}
