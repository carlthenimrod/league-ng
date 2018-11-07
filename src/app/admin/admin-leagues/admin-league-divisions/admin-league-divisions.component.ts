import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AdminLeagueDivisionFormComponent } from './admin-league-division-form/admin-league-division-form.component';
import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { divStaggerTrigger, divToggleTrigger } from './animations';

@Component({
  selector: 'app-admin-league-divisions',
  templateUrl: './admin-league-divisions.component.html',
  styleUrls: ['./admin-league-divisions.component.scss'],
  animations: [divStaggerTrigger, divToggleTrigger]
})
export class AdminLeagueDivisionsComponent implements OnInit {

  @Input() league: League;

  constructor(
    private dialog: MatDialog,
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

    dialogRef.afterClosed().subscribe((r?: {division?: Division, parent?: String}) => {
      const {division, parent} = r;

      if (division) {
        this.leagueService.addDivision(division, parent);
      }
    });
  }

  onEditClick(selectedDivision: Division, currentParent?: String) {
    const dialogRef = this.dialog.open(AdminLeagueDivisionFormComponent, {
      autoFocus: false,
      data: {
        league: this.league,
        division: {...selectedDivision},
        parent: currentParent
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((r?: {division?: Division, parent?: String}) => {
      const {division, parent} = r;

      if (division) {
        this.leagueService.updateDivision(division, parent);
      }
    });
  }

  onDeleteClick(division: Division) {
    const name = prompt('Warning: Cannot be undone! Enter division name to confirm:');

    if (!name) { return; }

    if (division.name === name.trim()) {
      this.leagueService.removeDivision(division._id);
    } else {
      alert('Error: Division name entered doesn\'t match.');
    }
  }
}
