import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TeamScheduleService } from '@app/services/team-schedule.service';
import { League } from '@app/models/league';

@Component({
  selector: 'app-team-league-standings',
  templateUrl: './team-league-standings.component.html',
  styleUrls: ['./team-league-standings.component.scss']
})
export class TeamLeagueStandingsComponent implements OnInit {
  $league: Observable<League>;

  constructor(
    private teamSchedule: TeamScheduleService
  ) { }

  ngOnInit() {
    this.$league = this.teamSchedule.$selectedLeague();
  }
}
