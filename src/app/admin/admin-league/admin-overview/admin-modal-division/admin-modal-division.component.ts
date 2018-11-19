import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-modal-division',
  templateUrl: './admin-modal-division.component.html',
  styleUrls: ['./admin-modal-division.component.scss']
})
export class AdminModalDivisionComponent implements OnInit {

  division: Division = new Division('');
  league: League;
  new = false;

  divisionForm = this.fb.group({
    name: [this.division.name]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, division?: Division},
    public dialogRef: MatDialogRef<AdminModalDivisionComponent>,
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
    this.dialogRef.close(this.division);
  }
}
