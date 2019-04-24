import { Component, OnInit, Input } from '@angular/core';

import { League } from '@app/models/league';

@Component({
  selector: 'app-league-schedule',
  templateUrl: './league-schedule.component.html',
  styleUrls: ['./league-schedule.component.scss']
})
export class LeagueScheduleComponent implements OnInit {
  @Input() league: League;

  constructor() { }

  ngOnInit() {
  }
}
