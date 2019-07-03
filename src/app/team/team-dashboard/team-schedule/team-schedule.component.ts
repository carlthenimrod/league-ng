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

  constructor(
    private teamSchedule: TeamScheduleService
  ) { }

  ngOnInit() {
    this.selectedGame = this.teamSchedule.findNextGame(this.team.schedule);
  }
}
