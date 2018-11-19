import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AdminModalDivisionComponent } from './admin-modal-division/admin-modal-division.component';
import { AdminModalTeamComponent } from './admin-modal-team/admin-modal-team.component';
import { League, Division } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { Team } from '@app/models/team';
import {
  unassignedTeamsToggleTrigger,
  unassignedTeamEnterTrigger,
  leagueOverviewEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
  animations: [
    unassignedTeamsToggleTrigger,
    unassignedTeamEnterTrigger,
    leagueOverviewEnterTrigger
  ]
})
export class AdminOverviewComponent implements OnInit, OnDestroy {

  @Input() league: League;
  leagueSubscription: Subscription;
  unassignedTeams: Team[] = [];
  draggedTeam: Team;
  draggedDivision: Division;
  draggedType: string;

  constructor(
    public dialog: MatDialog,
    public leagueService: LeagueService,
    public renderer: Renderer2
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
      'line-height.rem': 2.0 - (depth * 0.2),
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
    const parent = this.renderer.parentNode($event.target);
    this.renderer.addClass(parent, 'selected');

    if (this.draggedType === 'team') {
      $event.preventDefault();
    } else if (this.draggedType === 'division') {
      if (this.draggedDivision._id === division._id) { return; }
      $event.preventDefault();
    }
  }

  onDivisionDragLeave($event: DragEvent) {
    const parent = this.renderer.parentNode($event.target);
    this.renderer.removeClass(parent, 'selected');
  }

  onLeagueDrag($event: DragEvent, division: Division) {
    this.draggedType = 'division';
    this.draggedDivision = division;
  }

  onLeagueDrop($event: DragEvent, division: Division) {
    if (this.draggedType === 'team') {
      this.leagueService.addTeamToDivision(this.league._id, division._id, this.draggedTeam._id);

      delete this.draggedTeam;
    } else if (this.draggedType === 'division') {
      this.leagueService.updateDivision(this.draggedDivision, division._id);

      delete this.draggedDivision;
    }

    delete this.draggedType;
  }

  onLeagueDragOver($event: DragEvent, division: Division) {
    this.renderer.addClass($event.target, 'selected');

    if (this.draggedType === 'team') {
      $event.preventDefault();
    } else if (this.draggedType === 'division') {
      if (this.draggedDivision._id === division._id) { return; }
      $event.preventDefault();
    }
  }

  onLeagueDragLeave($event: DragEvent) {
    this.renderer.removeClass($event.target, 'selected');
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
