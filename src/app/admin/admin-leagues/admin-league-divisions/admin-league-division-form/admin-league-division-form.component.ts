import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Division } from '@app/models/division';
import { DivisionService } from '@app/core/division.service';
import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-league-division-form',
  templateUrl: './admin-league-division-form.component.html',
  styleUrls: ['./admin-league-division-form.component.scss']
})
export class AdminLeagueDivisionFormComponent implements OnInit {

  division: Division;
  parents: Division[] = [];
  parent: string;
  league: League;
  new = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, division?: Division, parent?: string},
    public dialogRef: MatDialogRef<AdminLeagueDivisionFormComponent>,
    public divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

    if (this.data.division) {
      this.division = this.data.division;
      this.division.parent = this.data.parent;
    } else {
      this.new = true;
      this.division = new Division('');
    }

    this.findParents(this.league.divisions);
  }

  findParents(divisions: Division[]) {
    if (divisions.length > 0) {
      this.parents = divisions.filter((d: Division) => d.name !== this.division.name);
    }
  }

  onSubmit() {
    this.divisionService.save(this.league._id, this.division)
    .subscribe((division: Division) => {
      this.dialogRef.close();
    });
  }
}
