import { Injectable } from '@angular/core';

import { League } from '@app/models/league';
import { Game } from '@app/models/game';

@Injectable({
  providedIn: 'root'
})
export class TeamScheduleService {
  constructor() { }

  generate(leagues: League[]): Game[] {
    const schedule: Game[] = [];

    leagues.forEach(league => {
      for (let i = 0; i < league.schedule.length; i++) {
        const group = league.schedule[i];
        
        if(group.games.length > 0) {
          group.games.forEach(game => {
            schedule.push({
              ...game,
              league: {
                _id: league._id,
                name: league.name
              },
              group: {
                _id: group._id,
                label: group.label
              }
            });
          });
        }
      }
    });

    this.order(schedule);

    return schedule;
  }

  order(schedule: Game[]) {
    schedule.sort((a, b) => {
      if (!a.start && !b.start) { return 0; }
      else if (a.start && !b.start) { return -1; }
      else if (!a.start && b.start) { return 1; }
      else {
        if (!a.time && !b.time) { return 0; }
        else if(a.time && !b.time) { return -1; }
        else if(!a.time && b.time) { return 1; }
        else {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        }
      }
    }); 
  }
}
