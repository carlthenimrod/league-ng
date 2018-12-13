import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

import { Team, TeamResponse } from '@app/models/team';
import { User } from '@app/models/user';

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
    this.http.get(url).pipe(
        map((teamResponse: TeamResponse) => {
          return this.formatResponse(teamResponse);
        })
      )
      .subscribe((team: Team) => {
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

  saveUser(user: User, roles: string[]) {
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
    });
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
}
