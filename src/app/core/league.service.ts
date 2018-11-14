import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

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
      this.leagueSubject.next(_.cloneDeep(this.league));
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

  findDivision(divisionId: string, divisions?: Division[]): Division {
    divisions = divisions || this.league.divisions;

    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      if (d._id === divisionId) {
        return d;
      }

      if (d.divisions.length > 0) {
        const match = this.findDivision(divisionId, d.divisions);
        if (match) { return match; }
      }
    }
  }

  findDivisionParent(id: string, get = 'parent', parent?: League|Division): League|Division {
    parent = parent || this.league;

    for (let i = 0; i < parent.divisions.length; i++) {
      const p = parent.divisions[i];

      if (p._id === id) {
        if (get === 'parent') {
          return parent;
        } else if (get === 'match') {
          return p;
        }
      }

      if (p.divisions.length > 0) {
        const match = this.findDivisionParent(id, get, p);
        if (match) { return match; }
      }
    }
  }

  findDivisionParentInChildren(divisions: Division[], id: string) {
    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      if (d._id === id) { return true; }

      if (d.divisions.length > 0) {
        const result = this.findDivisionParentInChildren(d.divisions, id);
        if (result) { return true; }
      }
    }

    return false;
  }

  addDivision(division: Division) {
    const url = this.api + `leagues/${this.league._id}/divisions`;

    this.http.post(url, {...division}).subscribe((newDivision: Division) => {
      this.league.divisions.push(newDivision);

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  updateDivision(division: Division, newParentId: string) {
    const url = this.api + `leagues/${this.league._id}/divisions/${division._id}`;

    this.http.put(url, {...division, parent: newParentId}).subscribe((updatedDivision: Division) => {
      const oldParent = this.findDivisionParent(division._id);
      const newParent = this.findDivisionParent(newParentId, 'match');

      const index = oldParent.divisions.findIndex(d => d._id === division._id);
      oldParent.divisions.splice(index, 1);

      if (oldParent._id === newParent._id) {
        oldParent.divisions.push(updatedDivision);
      } else {
        const match = this.findDivisionParentInChildren(division.divisions, division._id);

        if (match) {
          oldParent.divisions.push(...division.divisions);
        }

        newParent.divisions.push(updatedDivision);
      }

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  removeDivision(divisionId: string) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}`;

    this.http.delete(url).subscribe(() => {
    });
  }

  addTeam(id: string, team: Team): Observable<any> {
    const url = this.api + `leagues/${id}/teams`;
    return this.http.post(url, team);
  }

  removeTeam(id: string, teamId: string): Observable<any> {
    const url = this.api + `leagues/${id}/teams/${teamId}`;
    return this.http.delete(url);
  }

  addTeamToDivision(id: string, divisionId: string, teamId: string) {
    const url = this.api + `leagues/${id}/divisions/${divisionId}/teams/${teamId}`;

    this.http.post(url, {}).subscribe((addedTeam: Team) => {
      const division = this.findDivision(divisionId);
      division.teams.push(addedTeam);

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }
}
