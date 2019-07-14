import { Component, Input, OnInit, OnDestroy, ViewChildren, ViewContainerRef, QueryList, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { SocketData } from '@app/models/socket';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSidebarService } from '@app/services/team-sidebar.service';
import { TeamSocketService } from '@app/services/team-socket.service';
import { UserCardService } from './user-card.service';
import { ViewportService } from '@app/services/viewport.service';
import { sidebarSlideTrigger } from './animations';


@Component({
  selector: 'app-team-roster',
  styleUrls: ['./team-roster.component.scss'],
  templateUrl: './team-roster.component.html',
  providers: [UserCardService],
  animations: [sidebarSlideTrigger]
})
export class TeamRosterComponent implements OnInit, OnDestroy {
  @Input() team: Team;
  @ViewChildren('card', { read: ViewContainerRef }) cards: QueryList<ViewContainerRef>;
  @HostBinding('class.sidebar-open') sidebarOpen: boolean;
  @HostBinding('@sidebarSlide') sidebarState: string;
  rosterSub: Subscription;
  sidebarSub: Subscription;
  viewportSub: Subscription;
  viewportType: string;

  constructor(
    private teamService: TeamService,
    private teamSidebar: TeamSidebarService,
    private teamSocket: TeamSocketService,
    private userCard: UserCardService,
    private viewport: ViewportService
  ) {}

  ngOnInit() {
    this.rosterSub = this.teamSocket.roster$().subscribe((data: SocketData) => {
      switch (data.action) {
        case 'update':
          this.teamService.updateUser(data.users);
          break;
      }
    });

    this.viewportSub = this.viewport.$viewportType().subscribe(type => {
      this.viewportType = type;

      this.updateSidebarState();
    });

    this.sidebarSub = this.teamSidebar.$sidebarOpen().subscribe(status => {
      this.sidebarOpen = status;

      this.updateSidebarState();
    });
  }

  updateSidebarState() {
    if (this.sidebarOpen) {
      this.sidebarState = (this.viewportType === 'mobile') ? 'mobileOpen' : 'desktopOpen';
    } else {
      this.sidebarState = (this.viewportType === 'mobile') ? 'mobileClose' : 'desktopClose';
    }
  }

  ngOnDestroy() {
    this.rosterSub.unsubscribe();
    this.sidebarSub.unsubscribe();
    this.viewportSub.unsubscribe();
  }

  onClickSidebarToggle() {
    this.teamSidebar.toggleSidebar();
  }

  onClick(e, user, i) {
    const viewRef = this.cards.toArray()[i];

    this.userCard.open(user, viewRef);
  }
}
