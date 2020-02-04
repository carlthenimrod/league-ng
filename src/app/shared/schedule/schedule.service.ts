import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { GameGroup } from '@app/models/league';
import { Game } from '@app/models/game';

@Injectable()
export class ScheduleService {
  constructor() { }

  pickGroup(groups: GameGroup[]): number {
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];

      const latestGame = this.findLatestGame(group.games);
      if (!latestGame) { continue; }

      const cutoff = moment().add(1, 'd').startOf('day').add(3, 'h');
      if (cutoff.isAfter(latestGame.start)) { return i; }
    }

    return 0;
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

  orderGames(group: GameGroup, teamIds: string[]) {
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
