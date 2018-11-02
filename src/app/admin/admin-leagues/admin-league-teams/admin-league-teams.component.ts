import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AdminLeagueTeamFormComponent } from './admin-league-team-form/admin-league-team-form.component';
import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-admin-league-teams',
  templateUrl: './admin-league-teams.component.html',
  styleUrls: ['./admin-league-teams.component.scss']
})
export class AdminLeagueTeamsComponent implements OnInit {

  @Input() league: League;

  constructor(
    public dialog: MatDialog,
    public leagueService: LeagueService
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

    dialogRef.afterClosed().subscribe((team?: Team) => {
      if (team) {
        this.league.teams.push(team);
      }
    });
  }

  onRemoveClick(id: String, teamId: String) {
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
}
