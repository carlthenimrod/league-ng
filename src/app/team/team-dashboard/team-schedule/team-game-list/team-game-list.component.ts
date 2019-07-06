import { Component, OnInit, Input } from '@angular/core';

import { Team } from '@app/models/team';

@Component({
  selector: 'app-team-game-list',
  templateUrl: './team-game-list.component.html',
  styleUrls: ['./team-game-list.component.scss']
})
export class TeamGameListComponent implements OnInit {
  @Input() team: Team;

  constructor() { }

  ngOnInit() {
    console.log(this.team);
  }

}
