import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import _ from 'lodash';

import { League, Division, ScheduleOptions } from '@app/models/league';
import { Team } from '@app/models/team';
import { NoticeService } from './notice.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  api: string = environment.api;

  league: League;
  leagueSubject: Subject<League> = new Subject<League>();

  constructor(
    private http: HttpClient,
    private noticeService: NoticeService
  ) { }

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

  addDivision(division: Division) {
    const url = this.api + `leagues/${this.league._id}/divisions`;

    this.http.post(url, {...division}).subscribe((newDivision: Division) => {
      this.league.divisions.push(newDivision);
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  updateDivision(division: Division, newParentId?: string, index?: number) {
    const url = this.api + `leagues/${this.league._id}/divisions/${division._id}`;

    this.http.put(url, {...division, parent: newParentId, index}).subscribe((divisions: Division[]) => {
      this.league.divisions = divisions;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  removeDivision(divisionId: string) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}`;

    this.http.delete(url).subscribe((divisions: Division[]) => {
      this.league.divisions = divisions;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  addTeam(id: string, team: Team) {
    const url = this.api + `leagues/${id}/teams`;

    this.http.post(url, team).subscribe((newTeam: Team) => {
      this.league.teams.push(newTeam);
      this.leagueSubject.next(_.cloneDeep(this.league));

      // push notices if new team
      if (!team._id) { this.noticeService.push(); }
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

    this.http.delete(url).subscribe((league: League) => {
      this.league = league;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  addTeamToDivision(divisionId: string, teamId: string, index?: number) {
    const url = this.api + `leagues/${this.league._id}/divisions/${divisionId}/teams/${teamId}`;

    this.http.post(url, { index }).subscribe((divisions: Division[]) => {
      this.league.divisions = divisions;
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

  generateSchedule(options: ScheduleOptions) {
    const url = this.api + `leagues/${this.league._id}/schedule`;

    this.http.post(url, {...options}).subscribe((schedule) => {
      console.log(schedule);
      // this.league.schedule = schedule;
      // this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }
}
