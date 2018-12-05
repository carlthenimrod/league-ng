import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
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

  save(league: League): Observable<League> {
    return Observable.create(obs => {
      if (league._id) {
        const url = this.api + `leagues/${league._id}`;
        this.http.put(url, league).subscribe((savedLeague: League) => {
          this.leagueSubject.next(_.cloneDeep(savedLeague));
          obs.next(savedLeague);
        });
      } else {
        const url = this.api + 'leagues';
        this.http.post(url, league).subscribe((savedLeague: League) => {
          this.leagueSubject.next(_.cloneDeep(savedLeague));
          obs.next(savedLeague);
        });
      }
    });
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

  updateDivision(division: Division, newParentId: string, index?: number) {
    const url = this.api + `leagues/${this.league._id}/divisions/${division._id}`;

    this.http.put(url, {...division, parent: newParentId, index}).subscribe((updatedDivision: Division) => {
      const oldParent = this.findDivisionParent(division._id);
      let newParent;

      // find new parent
      if (newParentId === this.league._id) {
        newParent = this.league;
      } else {
        newParent = this.findDivisionParent(newParentId, 'match');
      }

      // check if parent is same
      if (oldParent._id === newParent._id) {

        // check if index is provided, position accordingly
        if ((typeof index === 'number') && (index < oldParent.divisions.length)) {
          const newDivisions: Division[] = [];

          oldParent.divisions.forEach((d: Division, i: number) => {
            if (index === i) { newDivisions.push(updatedDivision); }
            if (d._id !== updatedDivision._id) { newDivisions.push(d); }
          });

          oldParent.divisions = newDivisions;
        } else {
          const i = oldParent.divisions.findIndex(d => d._id === division._id);
          oldParent.divisions.splice(i, 1);
          oldParent.divisions.push(updatedDivision);
        }
      } else {
        // remove old division
        const i = oldParent.divisions.findIndex(d => d._id === division._id);
        oldParent.divisions.splice(i, 1);

        // check if parent is in child, pull children out if so
        const match = this.findDivisionParentInChildren(division.divisions, newParentId);
        if (match) { oldParent.divisions.push(...division.divisions); }

        // get new parent again after resolving conflict
        if (newParentId === this.league._id) {
          newParent = this.league;
        } else {
          newParent = this.findDivision(newParentId);
        }

        // check if index is provided, position accordingly
        if (typeof index === 'number') {
          newParent.divisions.splice(index, 0, updatedDivision);
        } else {
          newParent.divisions.push(updatedDivision);
        }
      }

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  removeDivision(divisionId: string) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}`;

    this.http.delete(url).subscribe(() => {
    });
  }

  addTeam(id: string, team: Team) {
    const url = this.api + `leagues/${id}/teams`;

    this.http.post(url, team).subscribe((newTeam: Team) => {
      this.league.teams.push(newTeam);

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  moveTeam(team: Team, index: number) {
    const url = this.api + `leagues/${this.league._id}/teams/${team._id}`;

    this.http.put(url, {...team, index}).subscribe((teams: Team[]) => {
      this.league.teams = teams;

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  removeTeam(teamId: string) {
    const url = this.api + `leagues/${this.league._id}/teams/${teamId}`;

    this.http.delete(url).subscribe((teams: Team[]) => {
      this.league.teams = teams;

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  addTeamToDivision(divisionId: string, teamId: string) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}/teams/${teamId}`;

    this.http.post(url, {}).subscribe((addedTeam: Team) => {
      const division = this.findDivision(divisionId);
      division.teams.push(addedTeam);

      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  findUnassignedTeams(): Team[] {
    const teams = [];

    if (this.league.divisions && this.league.divisions.length > 0) {
      if (this.league.teams && this.league.teams.length > 0) {
        this.league.teams.forEach((team: Team) => {
          const result = this.searchDivisionForTeam(this.league.divisions, team);
          if (!result) { teams.push(team); }
        });
      }
    }

    return teams;
  }

  searchDivisionForTeam(divisions: Division[], team: Team): boolean {
    for (let i = 0; i < divisions.length; i++) {
      const d = divisions[i];

      const match = d.teams.find(t => t._id === team._id);

      if (match) {
        return true;
      }

      if (d.divisions.length > 0) {
        const result = this.searchDivisionForTeam(d.divisions, team);
        if (result) { return true; }
      }
    }

    return false;
  }
}
