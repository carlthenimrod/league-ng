import { Component, OnInit, Input } from '@angular/core';

import { LeagueService } from '@app/core/league.service';
import { Team } from '@app/models/team';
import { teamsEnterTrigger, teamEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.scss'],
  animations: [teamsEnterTrigger, teamEnterTrigger]
})
export class AdminTeamListComponent implements OnInit {

  @Input() teams: Team[];
  dragged: { el: Element, item: Team };

  constructor(
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
  }

  onDrag(el: Element, team: Team) {
    this.dragged = {el, item: team};
  }

  onDrop(position: string, index: number) {
    if (position === 'after') { index = index + 1; }

    this.leagueService.moveTeam(this.dragged.item, index);
  }

  onDeleteClick(team: Team) {
    if (confirm(`Are you sure you want to remove ${team.name} from league?`)) {
      this.leagueService.removeTeam(team._id);
    }
  }

  stopPropagation($event: DragEvent) {
    return;
  }

  trackById(index: number, team: Team) {
    return team._id;
  }
}
