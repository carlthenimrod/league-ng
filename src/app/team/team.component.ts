import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamSidebarService } from '@app/services/team-sidebar.service';

@Component({
  selector: 'app-team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  sidebarOpen: boolean;
  sidebarState: string;
  team: Team;
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private teamSidebar: TeamSidebarService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ team }: { team: Team }) => {
      this.team = team;

      // this.teamSocket.connected$()
      //   .subscribe(connected => connected && this.teamSocket.join(this.team._id));
    });

    this.teamSidebar.isOpen$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(status => this.sidebarOpen = status);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // this.teamSocket.leave(this.team._id);
  }
}
