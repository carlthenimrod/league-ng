import { Component, OnInit, Input } from '@angular/core';

import { CalendarService } from '@app/calendar/calendar.service';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit {
  @Input() team: Team;

  constructor(private calendar: CalendarService) { }

  ngOnInit() {
    this.calendar.init(this.team.schedule);
  }
}
