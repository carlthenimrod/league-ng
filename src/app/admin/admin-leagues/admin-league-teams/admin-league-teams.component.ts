import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Team } from '@app/models/team';
import { AdminLeagueTeamFormComponent } from './admin-league-team-form/admin-league-team-form.component';

@Component({
  selector: 'app-admin-league-teams',
  templateUrl: './admin-league-teams.component.html',
  styleUrls: ['./admin-league-teams.component.scss']
})
export class AdminLeagueTeamsComponent implements OnInit {

  @Input() teams: Team[];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onAddClick(): void {
    const dialogRef = this.dialog.open(AdminLeagueTeamFormComponent, {
      autoFocus: false,
      width: '500px'
    });
  }
}
