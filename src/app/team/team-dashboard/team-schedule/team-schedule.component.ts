import { Component, OnInit, Input } from '@angular/core';

import { Team } from '@app/models/team';
import { TeamScheduleService } from '@app/services/team-schedule.service';
import { Game } from '@app/models/game';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit {
  @Input() team: Team;
  selectedGame: Game;
  selectedView: string = 'list';

  constructor(
    private teamSchedule: TeamScheduleService
  ) { }

  ngOnInit() {
    if (this.team.leagues.length === 1) { 
      this.teamSchedule.selectLeague(this.team.leagues[0]); 
    }

    this.selectedGame = this.teamSchedule.findNextGame(this.team.schedule);
  }

  onViewSelect(view: string) {
    this.selectedView = view;
  }
}
