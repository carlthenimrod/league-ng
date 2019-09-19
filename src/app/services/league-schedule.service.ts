import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Auth } from '@app/models/auth';
import { League, Group } from '@app/models/league';
import { Game } from '@app/models/game';

@Injectable({
  providedIn: 'root'
})
export class LeagueScheduleService {
  constructor() {}

  pickGroup(league: League): Group {
    if (league.schedule.length === 0) { return; }

    for (let i = 0; i < league.schedule.length; i++) {
      const group = league.schedule[i];

      const latestGame = this.findLatestGame(group.games);
      if (!latestGame) { continue; }

      const cutoff = moment().add(1, 'd').startOf('day').add(3, 'h');
      if (cutoff.isAfter(latestGame.start)) { return group; }
    }

    return league.schedule[0];
  }

  findLatestGame(games: Game[]): Game {
    let start: moment.Moment;
    let selectedGame: Game;

    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      // find latest game
      if (start && game.start && start.isBefore(game.start)) {
        start = moment(game.start);
        selectedGame = game;
      }

      // set default
      if (!start && game.start) {
        start = moment(game.start);
        selectedGame = game;
      }
    }

    return selectedGame;
  }

  orderGames(group: Group, teamIds: string[]) {
    group.games = [...group.games];
    group.games.sort((a, b) => {
      const inA = teamIds.some(id => {
        if (a.away._id === id || a.home._id === id) { return true; }
      });

      const inB = teamIds.some(id => {
        if (b.away._id === id || b.home._id === id) { return true; }
      });

      if (inA && !inB) { return -1; }
      if (!inA && inB) { return 1; }

      return 0;
    });
  }
}
