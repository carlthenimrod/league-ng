import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';

import { Team } from '@app/models/team';
import { TeamSidebarService } from '@app/services/team-sidebar.service';
import { TeamSocketService } from '@app/services/team-socket.service';
import { takeUntil, map, tap } from 'rxjs/operators';

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
    private teamSidebar: TeamSidebarService,
    private teamSocket: TeamSocketService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ team }: { team: Team }) => {
      this.team = team;

      this.teamSocket.connected$()
        .subscribe(connected => connected && this.teamSocket.join(this.team._id));
    });

    this.teamSidebar.isOpen$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(status => this.sidebarOpen = status);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.teamSocket.leave(this.team._id);
  }
}
