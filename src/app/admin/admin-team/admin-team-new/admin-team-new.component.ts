import { Component, OnInit } from '@angular/core';

import { Team } from '@app/models/team';

@Component({
  selector: 'app-admin-team-new',
  templateUrl: './admin-team-new.component.html',
  styleUrls: ['./admin-team-new.component.scss']
})
export class AdminTeamNewComponent implements OnInit {

  team: Team;

  constructor() { }

  ngOnInit() {
    this.team = { name: '', status: 'active' };
  }

}
