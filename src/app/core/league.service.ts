import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';

import { League, Division } from '@app/models/league';
import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  api: string = environment.api;

  league: League;
  leagueSubject: Subject<League> = new Subject<League>();

  constructor(public http: HttpClient) { }

  all(): Observable<any> {
    const url = this.api + 'leagues';
    return this.http.get(url);
  }

  get(id: String): void {
    const url = this.api + `leagues/${id}`;
    this.http.get(url).subscribe((league: League) => {
      this.league = league;
      this.leagueSubject.next(league);
    });
  }

  leagueListener(): Observable<League> {
    return this.leagueSubject.asObservable();
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

  addDivision(division: Division, parent: String) {
    const url = this.api + `leagues/${this.league._id}/divisions`;

    this.http.post(url, {...division, parent}).subscribe((newDivision: Division) => {
      if (parent) {
        this.addToDivisions(this.league.divisions, newDivision, parent);
      } else {
        this.league.divisions.push(newDivision);
      }

      this.leagueSubject.next(this.league);
    });
  }

  addToDivisions(divisions: Division[], newDivision: Division, parent: String) {
    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      if (d._id === parent) {
        d.divisions.push(newDivision);

        return;
      }

      if (d.divisions.length > 0) { // check children
        this.addToDivisions(d.divisions, newDivision, parent));
      }
    }
  }

  updateDivision(id: String, division: Division, parent: String): Observable<any> {
    const url = this.api + `leagues/${id}/divisions/${division._id}`;
    return this.http.put(url, {...division, parent});
  }

  removeDivision(divisionId: String) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}`;

    this.http.delete(url).subscribe(() => {
      this.removeFromDivisions(divisionId, this.league.divisions);

      this.leagueSubject.next(this.league);
    });
  }

  removeFromDivisions(divisionId: String, divisions: Division[]) {
    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      if (d.divisions.length > 0) {
        this.removeFromDivisions(divisionId, d.divisions);
      }

      if (d._id === divisionId) {
        if (d.divisions.length > 0) {
          divisions.push(...this.returnSubDivisions(d.divisions));
        }

        divisions.splice(i, 1);
      }
    }
  }

  returnSubDivisions(divisions: Division[]): Division[] {
    const children: Division[] = [];

    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];

      if (division.divisions.length > 0) {
        children.push(...this.returnSubDivisions(division.divisions));
      }

      children.push(division);
      divisions.splice(i, 1);
    }

    return children;
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
