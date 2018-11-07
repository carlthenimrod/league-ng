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

  findDivision(divisionId: String, divisions?: Division[], remove?: Boolean): Division {
    divisions = divisions || this.league.divisions;

    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      if (d._id === divisionId) {
        if (remove) { divisions.splice(i, 1); }

        return d;
      }

      if (d.divisions.length > 0) {
        const match = this.findDivision(divisionId, d.divisions, remove);

        if (match) { return match; }
      }
    }
  }

  findDivisionParent(divisionId: String, division?: Division): Division {
    division = division || this.league;

    for (let i = 0; i < division.divisions.length; i++) {
      const d = division.divisions[i];

      if (d._id === divisionId) { return division; }

      if (d.divisions.length > 0) {
        const match = this.findDivisionParent(divisionId, d);

        if (match) { return match; }
      }
    }
  }

  findAndRemoveDivisions(divisions?: Division[]) {
    divisions = divisions || this.league.divisions;
    const children: Division[] = [];

    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      if (d.divisions.length > 0) {
        this.findAndRemoveDivisions(d.divisions);
      }

      children.push(d);
    }

    divisions.length = 0;

    return children;
  }

  addDivision(division: Division, parent: String) {
    const url = this.api + `leagues/${this.league._id}/divisions`;

    this.http.post(url, {...division, parent}).subscribe((newDivision: Division) => {
      if (parent) {
        const match = this.findDivision(parent);

        if (match) { match.divisions.push(newDivision); }
      } else {
        this.league.divisions.push(newDivision);
      }

      this.leagueSubject.next(this.league);
    });
  }

  updateDivision(division: Division, parent: String) {
    const url = this.api + `leagues/${this.league._id}/divisions/${division._id}`;

    this.http.put(url, {...division, parent}).subscribe((updatedDivision: Division) => {
      const currentParent = this.findDivisionParent(updatedDivision._id);

      if (currentParent) {
        parent = parent || this.league._id;

        let match;

        if (currentParent._id !== parent) { // new parent, move division
          match = this.findDivision(updatedDivision._id, null, true);

          if (match.divisions.length > 0) {
            const divisions = this.findAndRemoveDivisions(match.divisions);
            this.league.divisions.push(...divisions);
          }

          if (parent === this.league._id) {
            this.league.divisions.push(updatedDivision);
          } else {
            const newParent = this.findDivision(parent);
            newParent.divisions.push(updatedDivision);
          }
        } else {
          match = this.findDivision(updatedDivision._id);
        }

        for (const prop in updatedDivision) { // update data
          if (updatedDivision.hasOwnProperty(prop)) {
            match[prop] = updatedDivision[prop];
          }
        }
      }
    });
  }

  removeDivision(divisionId: String) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}`;

    this.http.delete(url).subscribe(() => {
      const match = this.findDivision(divisionId, null, true);

      if (match && (match.divisions.length > 0)) {
        const divisions = this.findAndRemoveDivisions(match.divisions);
        this.league.divisions.push(...divisions);
      }

      this.leagueSubject.next(this.league);
    });
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
