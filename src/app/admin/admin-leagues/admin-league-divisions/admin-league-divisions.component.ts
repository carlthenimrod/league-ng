import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { League } from '@app/models/league';
import { AdminLeagueDivisionFormComponent } from './admin-league-division-form/admin-league-division-form.component';
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
    private divisionService: DivisionService
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

    dialogRef.afterClosed().subscribe((division?: Division) => {
      if (division) {
        this.league.divisions.push(division);
      }
    });
  }

  onEditClick(selectedDivision: Division) {
    const dialogRef = this.dialog.open(AdminLeagueDivisionFormComponent, {
      autoFocus: false,
      data: {
        league: this.league,
        division: {...selectedDivision}
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((division?: Division) => {
      if (division) {
        const index = this.league.divisions.findIndex((d: Division) => d._id === division._id);
        this.league.divisions[index] = division;
      }
    });
  }

  onDeleteClick(division: Division) {
    const name = prompt('Warning: Cannot be undone! Enter division name to confirm:');

    if (!name) { return; }

    if (division.name === name.trim()) {
      this.divisionService.delete(this.league._id, division._id).subscribe(() => {
        const index = this.league.divisions.findIndex((d: Division) => d._id === division._id);
        this.league.divisions.splice(index, 1);
      });
    } else {
      alert('Error: Division name entered doesn\'t match.');
    }
  }
}
