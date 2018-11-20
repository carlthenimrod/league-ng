import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { LeagueService } from '@app/core/league.service';
import { League, Division } from '@app/models/league';
import { Team } from '@app/models/team';
import {
  unassignedTeamsToggleTrigger,
  unassignedTeamEnterTrigger,
  leagueOverviewEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-divisions',
  templateUrl: './admin-divisions.component.html',
  styleUrls: ['./admin-divisions.component.scss'],
  animations: [
    unassignedTeamsToggleTrigger,
    unassignedTeamEnterTrigger,
    leagueOverviewEnterTrigger
  ]
})
export class AdminDivisionsComponent implements OnInit, OnDestroy {

  @Input() league: League;
  leagueSubscription: Subscription;
  unassignedTeams: Team[] = [];
  dragged: Division|Team;
  draggedType: string;


  constructor(
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
      'padding-left.rem': 1 + (depth * 0.5)
    };
  }

  onTeamDrag($event: DragEvent, team: Team) {
    this.draggedType = 'team';
    this.dragged = team;
  }

  onDrag($event: DragEvent, division: Division) {
    this.draggedType = 'division';
    this.dragged = division;
  }

  onDrop($event: DragEvent, division: Division, parent?: Division|League, index?: number) {
    if (this.draggedType === 'team') {
      if (parent) {

      } else {
        this.leagueService.addTeamToDivision(this.league._id, division._id, this.dragged._id);
      }
    } else if (this.draggedType === 'division') {
      if (parent) {
        this.leagueService.updateDivision((<Division>this.dragged), parent._id, index);
      } else {
        this.leagueService.updateDivision((<Division>this.dragged), division._id);
      }
    }

    delete this.dragged;
    delete this.draggedType;
  }

  onDragOver($event: DragEvent, division: Division, parent?: Division|League, index?: number) {
    if (this.draggedType === 'team') {
      $event.preventDefault();
    } else if (this.draggedType === 'division') {
      if (this.dragged._id === division._id) { return; }
      if (parent && this.dragged._id === parent._id) { return; }
      $event.preventDefault();
    }

    if (parent) {
      this.renderer.addClass($event.target, 'selected');
    } else {
      const parentNode = this.renderer.parentNode($event.target);
      this.renderer.addClass(parentNode, 'selected');
    }
  }

  onDragLeave($event: DragEvent, parentId?: string) {
    if (parentId) {
      this.renderer.removeClass($event.target, 'selected');
    } else {
      const parentNode = this.renderer.parentNode($event.target);
      this.renderer.removeClass(parentNode, 'selected');
    }
  }
}
