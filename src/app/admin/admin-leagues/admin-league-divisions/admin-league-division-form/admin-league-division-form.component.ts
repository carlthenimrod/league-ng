import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-league-division-form',
  templateUrl: './admin-league-division-form.component.html',
  styleUrls: ['./admin-league-division-form.component.scss']
})
export class AdminLeagueDivisionFormComponent implements OnInit {

  division: Division = new Division('');
  parents: Division[] = [];
  parent = '';
  league: League;
  new = false;
  divisionForm = this.fb.group({
    name: [this.division.name],
    parent: [this.parent]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, division?: Division, parent?: string},
    public dialogRef: MatDialogRef<AdminLeagueDivisionFormComponent>,
    public fb: FormBuilder,
    public leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

    if (this.data.division) {
      this.division = this.data.division;
      if (this.data.parent) { this.parent = this.data.parent; }
    } else {
      this.new = true;
    }

    this.findParents(this.league.divisions);
  }

  findParents(divisions: Division[]) {
    if (divisions.length > 0) {
      this.parents = divisions.filter((d: Division) => d.name !== this.division.name);
    }
  }

  onSubmit() {
    this.dialogRef.close({ division: this.division, parent: this.parent });
  }
}
