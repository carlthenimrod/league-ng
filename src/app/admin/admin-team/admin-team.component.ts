import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss']
})
export class AdminTeamComponent implements OnInit, OnDestroy {

  team: Team;
  teamSubscription: Subscription;
  editingTeam = false;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.teamService.get(params.get('id'));
        return this.teamService.teamListener();
      })
    )
    .subscribe((team: Team) => this.team = team);
  }

  ngOnDestroy() {
    this.teamSubscription.unsubscribe();
  }
}
