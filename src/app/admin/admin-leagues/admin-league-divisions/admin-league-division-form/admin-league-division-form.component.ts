import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Division } from '@app/models/division';
import { DivisionService } from '@app/core/division.service';

@Component({
  selector: 'app-admin-league-division-form',
  templateUrl: './admin-league-division-form.component.html',
  styleUrls: ['./admin-league-division-form.component.scss']
})
export class AdminLeagueDivisionFormComponent implements OnInit {

  division: Division;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {leagueId: string, division?: Division},
    private dialogRef: MatDialogRef<AdminLeagueDivisionFormComponent>,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    if (this.data.division) {
      this.division = this.data.division;
    } else {
      this.division = new Division('');
    }
  }

  onSubmit() {
    this.divisionService.save(this.data.leagueId, this.division)
    .subscribe((division: Division) => {
      this.dialogRef.close(division);
    });
  }
}
