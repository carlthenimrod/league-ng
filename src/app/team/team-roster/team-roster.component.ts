import { Component, Input, OnInit } from '@angular/core';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-team-roster',
  styleUrls: ['./team-roster.component.scss'],
  templateUrl: './team-roster.component.html'
})
export class TeamRosterComponent implements OnInit {
  @Input() team: Team;

  constructor() {}

  ngOnInit() {
    console.log(this.team);
  }
}
