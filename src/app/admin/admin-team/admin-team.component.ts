import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';
import { NoticeService } from '@app/core/notice.service';

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
    private noticeService: NoticeService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.teamService.get(params.get('id'));
        return this.teamService.teamListener();
      })
    )
    .subscribe((team: Team) => {
      this.team = team;

      // if new, update status, push notice
      if (this.team.status === 'new') {
        this.team.status = 'active';
        this.teamService.update(this.team).subscribe(() => {
          this.noticeService.push();
        });
      }
    });
  }

  ngOnDestroy() {
    this.teamSubscription.unsubscribe();
  }
}
