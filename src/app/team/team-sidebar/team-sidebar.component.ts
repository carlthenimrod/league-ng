import { Component, Input, OnInit, OnDestroy, ViewChildren, ViewContainerRef, QueryList, HostBinding } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSidebarService } from '@app/services/team-sidebar.service';
import { UserCardService } from './user-card.service';
import { ViewportService } from '@app/services/viewport.service';
import { sidebarSlideTrigger } from './animations';

@Component({
  selector: 'app-team-sidebar',
  styleUrls: ['./team-sidebar.component.scss'],
  templateUrl: './team-sidebar.component.html',
  providers: [UserCardService],
  animations: [sidebarSlideTrigger]
})
export class TeamSidebarComponent implements OnInit, OnDestroy {
  @Input() team: Team;
  @ViewChildren('card', { read: ViewContainerRef }) cards: QueryList<ViewContainerRef>;
  @HostBinding('class.sidebar-open') sidebarOpen: boolean;
  @HostBinding('@sidebarSlide') sidebarState: string;
  unsubscribe$ = new Subject<void>();

  constructor(
    private teamService: TeamService,
    private sidebar: TeamSidebarService,
    private userCard: UserCardService,
    private viewport: ViewportService
  ) {}

  ngOnInit() {
    // this.teamSocket.roster$()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((data: UserSocketData) => {
    //     switch (data.action) {
    //       case 'update':
    //         this.teamService.updateUser(data.users);
    //         break;
    //     }
    //   });

    combineLatest([this.viewport.type$, this.sidebar.isOpen$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.updateSidebarState.bind(this));
  }

  updateSidebarState([type, open]: [string, boolean]) {
    this.sidebarOpen = open;
    this.sidebarState = open
      ? type === 'mobile' ? 'mobileOpen' : 'desktopOpen'
      : type === 'mobile' ? 'mobileClose' : 'desktopClose';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickSidebarToggle() {
    this.sidebar.toggleSidebar();
  }

  onClick(e, user, i) {
    const viewRef = this.cards.toArray()[i];

    this.userCard.open(user, viewRef);
  }
}
