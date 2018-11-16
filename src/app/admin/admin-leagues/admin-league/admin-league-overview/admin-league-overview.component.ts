import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AdminLeagueDivisionModalComponent } from './admin-league-division-modal/admin-league-division-modal.component';
import { AdminLeagueTeamModalComponent } from './admin-league-team-modal/admin-league-team-modal.component';
import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { Team } from '@app/models/team';
import {
  unassignedTeamsToggleTrigger,
  unassignedTeamEnterTrigger,
  leagueOverviewEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-league-overview',
  templateUrl: './admin-league-overview.component.html',
  styleUrls: ['./admin-league-overview.component.scss'],
  animations: [
    unassignedTeamsToggleTrigger,
    unassignedTeamEnterTrigger,
    leagueOverviewEnterTrigger
  ]
})
export class AdminLeagueOverviewComponent implements OnInit, OnDestroy {

  @Input() league: League;
  leagueSubscription: Subscription;
  unassignedTeams: Team[] = [];
  draggedTeam: Team;
  draggedDivision: Division;
  draggedType: string;

  constructor(
    public dialog: MatDialog,
    public leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.unassignedTeams = this.leagueService.findUnassignedTeams();

    this.leagueSubscription = this.leagueService.leagueListener().subscribe((league: League) => {
      this.league = league;
      this.unassignedTeams = this.leagueService.findUnassignedTeams();
    });
  }

  ngOnDestroy() {
    this.leagueSubscription.unsubscribe();
  }

  styleDivisionName(depth: number) {
    return {
      'font-size.rem': 2.0 - (depth * 0.2),
      'padding-left.rem': 1 + (depth * 0.5)
    };
  }

  onTeamDrag($event: DragEvent, team: Team) {
    this.draggedType = 'team';
    this.draggedTeam = team;
  }

  onDivisionDrag($event: DragEvent, division: Division) {
    this.draggedType = 'division';
    this.draggedDivision = division;
  }

  onDivisionDrop($event: DragEvent, division: Division) {
    if (this.draggedType === 'team') {
      this.leagueService.addTeamToDivision(this.league._id, division._id, this.draggedTeam._id);

      delete this.draggedTeam;
    } else if (this.draggedType === 'division') {
      this.leagueService.updateDivision(this.draggedDivision, division._id);

      delete this.draggedDivision;
    }

    delete this.draggedType;
  }

  onDivisionDragOver($event: DragEvent, division: Division) {
    if (this.draggedType === 'team') {
      $event.preventDefault();
    } else if (this.draggedType === 'division') {
      if (this.draggedDivision._id === division._id) { return; }
      $event.preventDefault();
    }
  }

  onAddTeamClick(): void {
    const dialogRef = this.dialog.open(AdminLeagueTeamModalComponent, {
      autoFocus: false,
      data: {
        league: this.league
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((team: Team) => {
      if (team) {
        this.leagueService.addTeam(this.league._id, team);
      }
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
    const dialogRef = this.dialog.open(AdminLeagueDivisionModalComponent, {
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
    const dialogRef = this.dialog.open(AdminLeagueDivisionModalComponent, {
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
