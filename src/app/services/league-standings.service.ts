import { Injectable } from '@angular/core';

import { League, GameGroup, Division } from '@app/models/league';
import { Team } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class LeagueStandingsService {

  constructor() { }

  generateStandings(league: League) {
    this.calculateStats(league);

    // sort teams based on points
    league.teams.sort(this.sortByPoints);

    if (league.divisions.length > 0) {
      this.updateDivisions(league.teams, league.divisions);
    }
  }

  updateDivisions(teams: Team[], divisions: Division[]) {
    // add team records with updated stats to division
    divisions.forEach(division => {

      // update sub-divisions
      if (division.divisions.length > 0) {
        this.updateDivisions(teams, division.divisions);
      }

      // update teams
      if (division.teams.length > 0) {
        division.teams.forEach(team => {
          const index = teams.findIndex(t => t._id === team._id);
          const match = teams[index];

          team.wins = match.wins;
          team.losses = match.losses;
          team.draws = match.draws;
          team.points = match.points;
          team.goalsFor = match.goalsFor;
          team.goalsAgainst = match.goalsAgainst;
          team.goalDifference = match.goalDifference;
        });

        division.teams.sort(this.sortByPoints);
      }
    });
  }

  calculateStats(league: League) {
    const teams = league.teams;

    // set starting values
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];

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

    this.calculateGoalDifference(league.teams);
  }

  calculateGoalDifference(teams: Team[]) {
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];

      // set goal difference
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    }
  }

  sortByPoints(t1: Team, t2: Team) {
    if (t1.points > t2.points) { return -1; }
    if (t2.points > t1.points) { return 1; }

    return 0;
  }
}
