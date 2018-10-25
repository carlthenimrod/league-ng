import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Division } from '@app/models/division';
import { AdminLeagueDivisionFormComponent } from './admin-league-division-form/admin-league-division-form.component';

@Component({
  selector: 'app-admin-league-divisions',
  templateUrl: './admin-league-divisions.component.html',
  styleUrls: ['./admin-league-divisions.component.scss']
})
export class AdminLeagueDivisionsComponent implements OnInit {

  @Input() divisions: Division[];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onAddClick(): void {
    const dialogRef = this.dialog.open(AdminLeagueDivisionFormComponent, {
      autoFocus: false,
      width: '500px'
    });
  }
}
