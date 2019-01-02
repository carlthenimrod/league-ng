import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { League, ScheduleOptions, Group } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { AdminModalAutoGenerateComponent } from './admin-modal-auto-generate/admin-modal-auto-generate.component';
import { groupsEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-league-schedule',
  templateUrl: './admin-league-schedule.component.html',
  styleUrls: ['./admin-league-schedule.component.scss'],
  animations: [groupsEnterTrigger]
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
    config.maxWidth = '95vw';
    config.restoreFocus = false;
    config.width = '500px';

    const dialogRef = this.dialog.open(AdminModalAutoGenerateComponent, config);

    dialogRef.afterClosed().subscribe((options: ScheduleOptions) => {
      if (!options) { return; }
      this.leagueService.generateSchedule(options);
    });
  }

  onClickClearGames() {
    const msg = `Are you sure you want to clear all remaining games?`;

    if (confirm(msg)) {
      this.leagueService.clearSchedule();
    }
  }

  trackById(index: number, group: Group) {
    return group._id;
  }
}
