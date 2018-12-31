import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { League, ScheduleOptions } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { AdminModalAutoGenerateComponent } from './admin-modal-auto-generate/admin-modal-auto-generate.component';

@Component({
  selector: 'app-admin-league-schedule',
  templateUrl: './admin-league-schedule.component.html',
  styleUrls: ['./admin-league-schedule.component.scss']
})
export class AdminLeagueScheduleComponent implements OnInit {
  @Input() league: League;

  constructor(
    private dialog: MatDialog,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
  }

  onClickAutoGenerate() {
    const config = new MatDialogConfig();

    config.autoFocus = false;
    config.data = { league: this.league };
    config.restoreFocus = false;
    config.width = '500px';

    const dialogRef = this.dialog.open(AdminModalAutoGenerateComponent, config);

    dialogRef.afterClosed().subscribe((options: ScheduleOptions) => {
      if (!options) { return; }
      this.leagueService.generateSchedule(options);
    });
  }
}
