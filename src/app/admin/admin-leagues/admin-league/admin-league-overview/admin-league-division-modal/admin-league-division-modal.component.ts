import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-league-division-modal',
  templateUrl: './admin-league-division-modal.component.html',
  styleUrls: ['./admin-league-division-modal.component.scss']
})
export class AdminLeagueDivisionModalComponent implements OnInit {

  division: Division = new Division('');
  league: League;
  new = false;

  divisionForm = this.fb.group({
    name: [this.division.name]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, division?: Division},
    public dialogRef: MatDialogRef<AdminLeagueDivisionModalComponent>,
    public fb: FormBuilder,
    public leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

    if (this.data.division) {
      this.division = this.data.division;
    } else {
      this.new = true;
    }
  }

  onSubmit() {
    this.dialogRef.close({ division: this.division });
  }
}
