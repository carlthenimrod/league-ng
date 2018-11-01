import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AdminLeagueTeamFormComponent } from './admin-league-team-form/admin-league-team-form.component';
import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';
import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-league-teams',
  templateUrl: './admin-league-teams.component.html',
  styleUrls: ['./admin-league-teams.component.scss']
})
export class AdminLeagueTeamsComponent implements OnInit {

  @Input() league: League;

  constructor(
    public dialog: MatDialog,
    public teamService: TeamService
  ) { }

  ngOnInit() {
  }

  onAddClick(): void {
    const dialogRef = this.dialog.open(AdminLeagueTeamFormComponent, {
      autoFocus: false,
      data: {
        league: this.league
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((team: Team) => {
      this.league.teams.push(team);
    });
  }

  onEditClick(selectedTeam: Team) {
    const dialogRef = this.dialog.open(AdminLeagueTeamFormComponent, {
      autoFocus: false,
      data: {
        league: this.league,
        team: {...selectedTeam}
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((updatedTeam: Team) => {
      const index = this.league.teams.findIndex((team: Team) => team._id === updatedTeam._id);
      this.league.teams[index] = updatedTeam;
    });
  }

  onDeleteClick(team: Team) {
    const name = prompt('Warning: Cannot be undone! Enter Team name to confirm:');

    if (!name) { return; }

    if (team.name === name.trim()) {
      // this.teamService.delete(this.league._id, team._id).subscribe(() => {

      // });
    } else {
      alert('Error: Team name entered doesn\'t match.');
    }
  }
}
