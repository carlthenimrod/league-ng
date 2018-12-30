import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { League } from '@app/models/league';
import { AdminModalAutoGenerateComponent } from './admin-modal-auto-generate/admin-modal-auto-generate.component';

@Component({
  selector: 'app-admin-league-schedule',
  templateUrl: './admin-league-schedule.component.html',
  styleUrls: ['./admin-league-schedule.component.scss']
})
export class AdminLeagueScheduleComponent implements OnInit {
  @Input() league: League;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onClickAutoGenerate() {
    const config = new MatDialogConfig();

    config.autoFocus = false;
    config.data = { league: this.league };
    config.restoreFocus = false;
    config.width = '500px';

    this.dialog.open(AdminModalAutoGenerateComponent, config);
  }
}
