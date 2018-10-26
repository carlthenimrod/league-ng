import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { League } from '@app/models/league';
import { AdminLeagueDivisionFormComponent } from './admin-league-division-form/admin-league-division-form.component';
import { Division } from '@app/models/division';

@Component({
  selector: 'app-admin-league-divisions',
  templateUrl: './admin-league-divisions.component.html',
  styleUrls: ['./admin-league-divisions.component.scss']
})
export class AdminLeagueDivisionsComponent implements OnInit {

  @Input() league: League;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onAddClick(): void {
    const dialogRef = this.dialog.open(AdminLeagueDivisionFormComponent, {
      autoFocus: false,
      data: {
        leagueId: this.league._id
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((division?: Division) => {
      if (division) {
        this.league.divisions.push(division);
      }
    });
  }
}
