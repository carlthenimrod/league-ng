import { Component, OnInit, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

import { LeagueService } from '@app/core/league.service';
import { League, Division } from '@app/models/league';
import { Team } from '@app/models/team';
import {
  unassignedTeamsToggleTrigger,
  unassignedTeamEnterTrigger,
  divisionEnterTrigger,
  divisionsEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-divisions',
  templateUrl: './admin-divisions.component.html',
  styleUrls: ['./admin-divisions.component.scss'],
  animations: [
    unassignedTeamsToggleTrigger,
    unassignedTeamEnterTrigger,
    divisionEnterTrigger,
    divisionsEnterTrigger
  ]
})
export class AdminDivisionsComponent implements OnInit, OnChanges {

  @Input() league: League;
  unassignedTeams: Team[] = [];
  dragged: { el: Element, item: Division|Team };


  constructor(
    public leagueService: LeagueService,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.unassignedTeams = this.leagueService.findUnassignedTeams();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.league && !changes.league.firstChange) {
      this.unassignedTeams = this.leagueService.findUnassignedTeams();
    }
  }

  styleDivisionName(depth: number) {
    return {
      'font-size.rem': 2.0 - (depth * 0.2),
      'padding-left.rem': 1 + (depth * 0.5)
    };
  }

  onDrag(el: Element, item: Division|Team) {
    this.dragged = {el, item};
  }

  onDivisionDrop(position: string, target: Division, parent: Division|League, index: number) {
    if (position === 'after') { index = index + 1; }

    // check type
    if (this.isDivision(this.dragged.item)) { // division
      if (position === 'in') {
        this.leagueService.updateDivision(this.dragged.item, target._id);
      } else {
        this.leagueService.updateDivision(this.dragged.item, parent._id, index);
      }
    } else { // team
      this.leagueService.addTeamToDivision(target._id, this.dragged.item._id);
    }
  }

  onTeamDrop(position: string, index: number) {
    if (position === 'after') { index = index + 1; }

    // check type
    if (this.isDivision(this.dragged.item)) { // division

    } else { // team

    }
  }

  onDeleteClick(team: Team) {
    // if (confirm(`Are you sure you want to remove ${team.name} from league?`)) {
    //   this.leagueService.removeTeam(team._id);
    // }
  }

  isDivision(type: Team|Division): type is Division {
    return (<Division>type).teams !== undefined;
  }

  stopPropagation($event: DragEvent) {
    return;
  }

  trackById(index: number, item: League|Division|Team) {
    return item._id;
  }
}
