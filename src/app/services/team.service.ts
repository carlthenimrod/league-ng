import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { League, GameGroup } from '@app/models/league';
import { Team, TeamResponse, TeamRosterResponse, TeamRoster } from '@app/models/team';
import { User } from '@app/models/user';
import { TeamScheduleService } from './team-schedule.service';
import { LeagueStandingsService } from './league-standings.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  api: string = environment.api;
  team: Team;
  teamSubject = new BehaviorSubject<Team>(null);
  team$ = this.teamSubject.asObservable();

  constructor(
    private http: HttpClient,
    private leagueStandings: LeagueStandingsService,
    private teamSchedule: TeamScheduleService
  ) { }

  get$(): Observable<Team[]>;
  get$(id: string): Observable<Team>;
  get$(id?: string): Observable<Team|Team[]> {
    const url = `${this.api}teams${id ? `/${id}` : ``}`;

    return id
      ? this.http.get<TeamResponse>(url)
        .pipe<Team, Team>(
          map(this.mapResponse.bind(this)),
          tap(team => {
            this.team = team;
            this.teamSubject.next(_.cloneDeep(this.team));
          })
        )
      : this.http.get<Team[]>(url);
  }

  post$(team: Team): Observable<Team> {
    const url = `${this.api}teams`;

    return this.http.post<Team>(url, team);
  }

  put$(team: Partial<Team>): Observable<Team> {
    const url = `${this.api}teams/${this.team._id}`;

    return this.http.put<Team>(url, team)
      .pipe(
        tap(updatedTeam => {
          this.team = updatedTeam;
          this.teamSubject.next(_.cloneDeep(this.team));
        })
      );
  }

  delete$(): Observable<void> {
    const url = `${this.api}teams/${this.team._id}`;

    return this.http.delete<void>(url)
      .pipe(
        tap(() => {
          this.team = null;
          this.teamSubject.next(null);
        })
      );
  }

  userPost$(user: User): Observable<Team> {
    const url = `${this.api}teams/${this.team._id}/users`;
    return this.http.post<TeamResponse>(url, user)
      .pipe<Team, Team>(
        map(this.mapResponse.bind(this)),
        tap(updatedTeam => {
          this.team = updatedTeam;
          this.teamSubject.next(_.cloneDeep(this.team));
        })
      );
  }

  userPut$(user: Partial<User>): Observable<Team> {
    const url = `${this.api}teams/${this.team._id}/users/${user._id}`;
    return this.http.put<TeamResponse>(url, user)
      .pipe<Team, Team>(
        map(this.mapResponse.bind(this)),
        tap(updatedTeam => {
          this.team = updatedTeam;
          this.teamSubject.next(_.cloneDeep(this.team));
        })
      );
  }

  userDelete$(user: Partial<User>): Observable<Team> {
    const url = `${this.api}teams/${this.team._id}/users/${user._id}`;
    return this.http.delete<TeamResponse>(url)
      .pipe<Team, Team>(
        map(this.mapResponse.bind(this)),
        tap(updatedTeam => {
          this.team = updatedTeam;
          this.teamSubject.next(_.cloneDeep(this.team));
        })
      );
  }

  teamExists$(name: string): Observable<void> {
    const url = `${this.api}teams/name`;

    return this.http.post<void>(url, { name });
  }

  editUser(userId: string, roles: string[]) {
    const url = this.api + `teams/${this.team._id}/users/${userId}`;

    this.http.put(url, {roles}).pipe(
      map((teamResponse: TeamResponse) => {
        return this.mapResponse(teamResponse);
      })
    )
    .subscribe((team: Team) => {
      this.team = team;
      this.teamSubject.next(_.cloneDeep(this.team));
    });
  }

  removeUser(userId: string) {
    const url = this.api + `teams/${this.team._id}/users/${userId}`;

    this.http.delete(url).pipe(
      map((teamResponse: TeamResponse) => {
        return this.mapResponse(teamResponse);
      })
    )
    .subscribe((team: Team) => {
      this.team = team;
      this.teamSubject.next(_.cloneDeep(this.team));
    });
  }

  invite(user: User) {
    const url = this.api + `teams/${this.team._id}/invite`;

    this.http.post(url, user).subscribe((invitedUser: User) => {
      if (!invitedUser) { return; }
      if (!this.team.pending) { this.team.pending = []; }
      this.team.pending.push(invitedUser);
      this.teamSubject.next(_.cloneDeep(this.team));
    });
  }

  getUserRoles(userId: string): string[] {
    const user = this.team.users.find(u => u._id === userId);

    return user.roles;
  }

  mapResponse(response: TeamResponse): Team {
    return {
      ...response,
      roster: this.mapRoster(response.roster),
      users: response.roster.map(u => {
        return { ...u.user, roles: u.roles };
      })
    };
  }

  mapRoster(roster: TeamRosterResponse[]): TeamRoster[] {
    const players = [];
    const coaches = [];
    const managers = [];

    roster.forEach(r => {
      if (r.roles.includes('manager')) { managers.push({ ...r.user, roles: r.roles }); }
      if (r.roles.includes('coach')) { coaches.push({ ...r.user, roles: r.roles }); }
      if (r.roles.includes('player')) { players.push({ ...r.user, roles: r.roles }); }
    });

    return [
      { role: 'manager', users: managers },
      { role: 'coach', users: coaches },
      { role: 'player', users: players }
    ];
  }

  updateUser(users: User[]) {
    users.forEach(user => {
      for (let i = 0; i < this.team.users.length; i++) {
        const u = this.team.users[i];

        if (u._id === user._id) {
          u.name = user.name;
          u.fullName = user.fullName;
          u.email = user.email;
          u.status = user.status;
        }
      }
    });

    this.orderRoster(this.team.roster);
    this.teamSubject.next(_.cloneDeep(this.team));
  }

  orderRoster(roster: TeamRoster[]) {
    roster.forEach(group => {
      group.users.sort(this.sortByFullName);
      group.users.sort(this.sortByOnlineStatus);
    });
  }

  sortByFullName(a: User, b: User): number {
    const aName = a.fullName.toUpperCase();
    const bName = b.fullName.toUpperCase();

    if (aName >= bName) {
      return 1;
    } else {
      return -1;
    }
  }

  sortByOnlineStatus(a: User, b: User): number {
    if ((a.status === 'online') && (b.status !== 'online')) {
      return -1;
    } else if ((a.status !== 'online') && (b.status === 'online')) {
      return 1;
    } else {
      return 0;
    }
  }

  calculateStandings(league: League): Team[] {
    const teams = league.teams;

    // set starting values
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];

      team.position = 0;
      team.wins = 0;
      team.losses = 0;
      team.draws = 0;
      team.points = 0;
      team.goalsFor = 0;
      team.goalsAgainst = 0;
      team.goalDifference = 0;
    }

    // loop thru games, update stats
    for (let i = 0; i < league.schedule.length; i++) {
      const group: GameGroup = league.schedule[i];

      for (let x = 0; x < group.games.length; x++) {
        const game = group.games[x];

        if ((typeof game.home.score === 'number') && (typeof game.away.score === 'number')) {
          const home = teams[teams.findIndex((t: Team) => t._id === game.home._id)];
          const away = teams[teams.findIndex((t: Team) => t._id === game.away._id)];

          if (game.home.score > game.away.score) {
            ++home.wins;
            ++away.losses;
            home.points = home.points + 3;
          } else if (game.away.score > game.home.score) {
            ++away.wins;
            ++home.losses;
            away.points = away.points + 3;
          } else {
            ++home.draws;
            ++home.points;
            ++away.draws;
            ++away.points;
          }

          home.goalsFor = home.goalsFor + game.home.score;
          home.goalsAgainst = home.goalsAgainst + game.away.score;

          away.goalsFor = away.goalsFor + game.away.score;
          away.goalsAgainst = away.goalsAgainst + game.home.score;
        }
      }
    }

    // sort teams based on points
    teams.sort((t1, t2) => {
      if (t1.points > t2.points) { return -1; }
      if (t2.points > t1.points) { return 1; }

      return 0;
    });

    // set position
    let position;

    for (let i = 0; i < teams.length; i++) {
      if (!position) { position = 1; }

      const team = teams[i];

      team.position = position;
      ++position;

      // set goal difference
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    }

    return teams;
  }
}
