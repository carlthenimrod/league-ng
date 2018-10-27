import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AdminLeagueDivisionFormComponent } from './admin-league-division-form/admin-league-division-form.component';
import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { Division } from '@app/models/division';
import { DivisionService } from '@app/core/division.service';

@Component({
  selector: 'app-admin-league-divisions',
  templateUrl: './admin-league-divisions.component.html',
  styleUrls: ['./admin-league-divisions.component.scss']
})
export class AdminLeagueDivisionsComponent implements OnInit {

  @Input() league: League;

  constructor(
    private dialog: MatDialog,
    private divisionService: DivisionService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
  }

  onAddClick() {
    const dialogRef = this.dialog.open(AdminLeagueDivisionFormComponent, {
      autoFocus: false,
      data: {
        league: this.league
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.leagueService.get(this.league._id).subscribe((league: League) => {
        this.league = league;
      });
    });
  }

  onEditClick(selectedDivision: Division, parent?: string) {
    const dialogRef = this.dialog.open(AdminLeagueDivisionFormComponent, {
      autoFocus: false,
      data: {
        league: this.league,
        division: {...selectedDivision},
        parent: parent
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.leagueService.get(this.league._id).subscribe((league: League) => {
        this.league = league;
      });
    });
  }

  onDeleteClick(division: Division) {
    const name = prompt('Warning: Cannot be undone! Enter division name to confirm:');

    if (!name) { return; }

    if (division.name === name.trim()) {
      this.divisionService.delete(this.league._id, division._id).subscribe(() => {
        this.leagueService.get(this.league._id).subscribe((league: League) => {
          this.league = league;
        });
      });
    } else {
      alert('Error: Division name entered doesn\'t match.');
    }
  }
}
