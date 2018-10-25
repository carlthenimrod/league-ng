import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-league-details',
  templateUrl: './admin-league-details.component.html',
  styleUrls: ['./admin-league-details.component.scss']
})
export class AdminLeagueDetailsComponent implements OnInit {

  @Input() league: League;
  @Output('editClick') editClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private leagueService: LeagueService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.emit(true);
  }

  onDeleteClick() {
    let name = prompt('Warning: Cannot be undone! Enter league name to confirm:');

    if (name) {
      name = name.trim();
    } else {
      return;
    }

    if (this.league.name === name) {
      this.leagueService.delete(this.league._id).subscribe(() => {
        this.router.navigate(['/', 'admin', 'leagues']);
      });
    } else {
      alert('Error: League name entered doesn\'t match.');
    }
  }
}