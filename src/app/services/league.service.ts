import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { League, Division, ScheduleOptions, Group, LeagueGroup } from '@app/models/league';
import { Team } from '@app/models/team';
import { NoticeService } from './notice.service';
import { Game } from '@app/models/game';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private api = environment.api;
  private league: League;
  private leagueSubject = new BehaviorSubject<League>(null);
  league$ = this.leagueSubject.asObservable();

  constructor(
    private http: HttpClient,
    private noticeService: NoticeService
  ) { }

  get$(): Observable<League[]>;
  get$(id: string): Observable<League>;
  get$(id?: string): Observable<League|League[]> {
    const url = `${this.api}leagues` + `${id ? `/${id}` : ``}`;

    return id
      ? this.http.get<League>(url)
        .pipe<League>(
          tap(league => {
            this.league = league;
            this.leagueSubject.next(_.cloneDeep(this.league));
          })
        )
      : this.http.get<League[]>(url);
  }

  post$(league: League): Observable<League> {
    const url = `${this.api}leagues`;

    return this.http.post<League>(url, league)
      .pipe(
        tap(newLeague => {
          this.league = newLeague;
          this.leagueSubject.next(_.cloneDeep(newLeague));
        })
      );
  }

  put$(values: { [key: string]: any }): Observable<League> {
    const url = `${this.api}leagues/${this.league._id}`;

    return this.http.put<League>(url, { ...this.league, ...values })
      .pipe(
        tap(league => {
          this.league = league;
          this.leagueSubject.next(_.cloneDeep(this.league));
        })
      );
  }

  delete$() {
    const url = `${this.api}leagues/${this.league._id}`;
    return this.http.delete<void>(url)
      .pipe(
        tap(() => {
          this.league = null;
          this.leagueSubject.next(null);
        })
      );
  }

  group(leagues: League[]): { groups: LeagueGroup[], ungrouped: League[] } {
    const groups = [];
    const ungrouped = [];

    leagues.forEach(league => {
      const index = league.name.indexOf(':');
      if (index === -1) { return ungrouped.push(league); }

      const label = league.name.substr(0, index).trim();
      const name = league.name.substr(index + 1).trim();
      league.name = name;

      const match = groups.find(group => group.label === label);

      if (match) {
        match.leagues.push(league);
      } else {
        groups.push({
          label,
          leagues: [league]
        });
      }
    });


    return { groups, ungrouped };
  }

  update(league: League): Observable<any> {
    const url = this.api + `leagues/${league._id}`;
    return this.http.put(url, league).pipe(
      tap((updatedLeague: League) => {
        this.league = updatedLeague;
        this.leagueSubject.next(_.cloneDeep(this.league));
      })
    );
  }

  delete(id: string): Observable<any> {
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

    this.http.post(url, {...options}).subscribe((groups: Group[]) => {
      this.league.schedule = groups;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  clearSchedule() {
    const url = this.api + `leagues/${this.league._id}/schedule`;

    this.http.delete(url).subscribe(() => {
      this.league.schedule.length = 0;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  addGroup(label: string, game?: Game) {
    const url = this.api + `leagues/${this.league._id}/schedule/add`;

    this.http.post(url, {label}).subscribe((group: Group) => {
      this.addGame(group._id, game);
    });
  }

  updateGroup(group: Group) {
    const url = this.api + `leagues/${this.league._id}/schedule/${group._id}`;

    this.http.put(url, _.pick(group, ['label'])).subscribe((updatedGroup: Group) => {
      const index = this.league.schedule.findIndex((g => g._id === updatedGroup._id));
      this.league.schedule[index].label = updatedGroup.label;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  removeGroup(group: Group) {
    const url = this.api + `leagues/${this.league._id}/schedule/${group._id}`;

    this.http.delete(url).subscribe(() => {
      const index = this.league.schedule.findIndex((g => g._id === group._id));
      this.league.schedule.splice(index, 1);
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  addGame(groupId: string, game: Game) {
    const url = this.api + `leagues/${this.league._id}/schedule/${groupId}/games`;

    this.http.post(url, game).subscribe((groups: Group[]) => {
      this.league.schedule = groups;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }

  updateGame(groupId: string, game: Game) {
    const url = this.api + `leagues/${this.league._id}/schedule/${groupId}/games/${game._id}`;

    this.http.put(url, game).subscribe((groups: Group[]) => {
      this.league.schedule = groups;
      this.leagueSubject.next(_.cloneDeep(this.league));
    });
  }
}
