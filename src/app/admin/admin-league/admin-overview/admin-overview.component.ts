import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AdminModalDivisionComponent } from './admin-modal-division/admin-modal-division.component';
import { AdminModalTeamComponent } from './admin-modal-team/admin-modal-team.component';
import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { Team } from '@app/models/team';
import { paragraphEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
  animations: [paragraphEnterTrigger]
})
export class AdminOverviewComponent implements OnInit {

  @Input() league: League;
  leagueSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    public leagueService: LeagueService
  ) { }

  ngOnInit() {
  }

  onAddTeamClick(): void {
    const dialogRef = this.dialog.open(AdminModalTeamComponent, {
      autoFocus: false,
      data: {
        league: this.league
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((team: Team) => {
      if (!team) { return; }
      this.leagueService.addTeam(this.league._id, team);
    });
  }

  onTeamRemoveClick(id: string, teamId: string) {
    this.leagueService.removeTeam(id, teamId).subscribe(
      () => {
        for (let i = 0; i < this.league.teams.length; i++) {
          if (this.league.teams[i]._id === teamId) {
            this.league.teams.splice(i, 1);
          }
        }
      }
    );
  }

  onNewDivisionClick() {
    const dialogRef = this.dialog.open(AdminModalDivisionComponent, {
      autoFocus: false,
      data: {
        league: this.league
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((division: Division) => {
      if (division) {
        this.leagueService.addDivision(division);
      }
    });
  }

  onDivisionEditClick(selectedDivision: Division) {
    const dialogRef = this.dialog.open(AdminModalDivisionComponent, {
      autoFocus: false,
      data: {
        league: this.league,
        division: {...selectedDivision}
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((r?: {division?: Division, parent?: string}) => {
      const {division, parent} = r;

      if (division) {
        this.leagueService.updateDivision(division, parent);
      }
    });
  }

  onDivisionDeleteClick(division: Division) {
    const name = prompt('Warning: Cannot be undone! Enter division name to confirm:');

    if (!name) { return; }

    if (division.name === name.trim()) {
      this.leagueService.removeDivision(division._id);
    } else {
      alert('Error: Division name entered doesn\'t match.');
    }
  }
}
