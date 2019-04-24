import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import _ from 'lodash';

import { League, Group } from '@app/models/league';
import { Team, TeamResponse } from '@app/models/team';
import { User } from '@app/models/user';
import { NoticeService } from './notice.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  api: string = environment.api;

  team: Team;
  teamSubject: Subject<Team> = new Subject<Team>();

  constructor(
    private http: HttpClient,
    private noticeService: NoticeService
  ) { }

  all(): Observable<any> {
    const url = this.api + 'teams';
    return this.http.get(url);
  }

  get(id: String): Observable<Team> {
    const url = this.api + `teams/${id}`;
    return this.http.get(url).pipe(
      map((teamResponse: TeamResponse) => {
        return this.formatResponse(teamResponse);
      }),
      tap((team: Team) => {
        this.team = team;
        this.teamSubject.next(_.cloneDeep(this.team));
      })
    );
  }

  teamListener(): Observable<Team> {
    return this.teamSubject.asObservable();
  }

  create(team: Team): Observable<any> {
    const url = this.api + 'teams';
    return this.http.post(url, team);
  }

  update(team: Team): Observable<any> {
    const url = this.api + `teams/${team._id}`;
    return this.http.put(url, team).pipe(
      map((teamResponse: TeamResponse) => {
        return this.formatResponse(teamResponse);
      }),
      tap((updatedTeam: Team) => {
        this.team = updatedTeam;
        this.teamSubject.next(_.cloneDeep(this.team));
      })
    );
  }

  delete(id: string): Observable<any> {
    const url = this.api + `teams/${id}`;
    return this.http.delete(url);
  }

  addUser(user: User, roles: string[]) {
    const url = this.api + `teams/${this.team._id}/users`;
    const data = {
      userId: user._id,
      name: user.name,
      roles
    };

    this.http.post(url, data).pipe(
      map((teamResponse: TeamResponse) => {
        return this.formatResponse(teamResponse);
      })
    )
    .subscribe((team: Team) => {
      this.team = team;
      this.teamSubject.next(_.cloneDeep(this.team));

      // push notices if new user
      if (!user._id) { this.noticeService.push(); }
    });
  }

  editUser(userId: string, roles: string[]) {
    const url = this.api + `teams/${this.team._id}/users/${userId}`;

    this.http.put(url, {roles}).pipe(
      map((teamResponse: TeamResponse) => {
        return this.formatResponse(teamResponse);
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
        return this.formatResponse(teamResponse);
      })
    )
    .subscribe((team: Team) => {
      this.team = team;
      this.teamSubject.next(_.cloneDeep(this.team));
    });
  }

  getUserRoles(userId: string): string[] {
    const roles = [];

    if (this.team.players.some(p => p._id === userId)) { roles.push('player'); }
    if (this.team.managers.some(m => m._id === userId)) { roles.push('manager');  }
    if (this.team.coaches.some(c => c._id === userId)) { roles.push('coach'); }

    return roles;
  }

  formatResponse(teamResponse: TeamResponse) {
    const team: Team = {
      name: teamResponse.name,
      status: teamResponse.status,
      leagues: teamResponse.leagues,
      players: [],
      coaches: [],
      managers: [],
      _id: teamResponse._id,
      __v: teamResponse.__v
    };

    for (let i = 0; i < teamResponse.roster.length; i++) {
      const u = teamResponse.roster[i];

      for (let x = 0; x < u.roles.length; x++) {
        const role = u.roles[x];

        switch (role) {
          case 'player':
            team.players.push(u.user);
            break;

          case 'coach':
            team.coaches.push(u.user);
            break;

          case 'manager':
            team.managers.push(u.user);
            break;
        }
      }
    }

    return team;
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
      const group: Group = league.schedule[i];

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
