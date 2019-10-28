import { Component, OnInit, Input } from '@angular/core';

import { League } from '@app/models/league';
import { DialogService } from '@app/shared/dialog/dialog.service';
import { AdminLeagueAddTeamComponent } from '../admin-league-add-team/admin-league-add-team.component';

@Component({
  selector: 'app-admin-league-header',
  templateUrl: './admin-league-header.component.html',
  styleUrls: ['./admin-league-header.component.scss']
})
export class AdminLeagueHeaderComponent implements OnInit {
  @Input() league: League;

  constructor(
    public dialog: DialogService
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.dialog.open(AdminLeagueAddTeamComponent);
  }
}
