import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';

@Component({
  selector: 'app-admin-league-details',
  templateUrl: './admin-league-details.component.html',
  styleUrls: ['./admin-league-details.component.scss']
})
export class AdminLeagueDetailsComponent {
  @Input() league: League;
  @Output() editClick = new EventEmitter<boolean>();

  constructor(
    public leagueService: LeagueService,
    public router: Router
  ) { }

  onEditClick() {
    this.editClick.emit(true);
  }

  onDeleteClick() {
    const name = prompt('Warning: Cannot be undone! Enter league name to confirm:');

    if (!name) { return; }

    if (this.league.name === name.trim()) {
      this.leagueService.delete(this.league._id).subscribe(() => {
        this.router.navigate(['/', 'admin', 'leagues']);
      });
    } else {
      alert('Error: League name entered doesn\'t match.');
    }
  }
}
