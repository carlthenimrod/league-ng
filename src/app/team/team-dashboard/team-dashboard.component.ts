import { Component, OnInit, HostListener, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSidebarService } from '@app/services/team-sidebar.service';
import { ProfileImg } from '@app/models/profile-img';
import { Subscription } from 'rxjs';
import { ViewportService } from '@app/services/viewport.service';
import { dashboardSlideTrigger } from './animations';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss'],
  animations: [dashboardSlideTrigger]
})
export class TeamDashboardComponent implements OnInit, OnDestroy {
  @HostBinding('class.sidebar-open') sidebarOpen: boolean;
  @HostBinding('@dashboardSlide') sidebarState: string;
  mobileNav = false;
  sidebarSub: Subscription;
  team: Team;
  tab = 'feed';
  viewportSub: Subscription;
  viewportType: string;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private teamSidebar: TeamSidebarService,
    private viewport: ViewportService
  ) { }

  @HostListener('window:resize') onResize() {
    if (this.mobileNav) { this.mobileNav = false; }
  }

  @HostListener('click') onClickSlide() {
    if (this.mobileNav) { this.mobileNav = false; }
    if (this.sidebarOpen) { this.teamSidebar.toggleSidebar(); }
  }

  ngOnInit() {
    this.teamService.teamListener().subscribe((team: Team) => this.team = team);

    this.route.data.subscribe((data: {team: Team}) => {
      this.team = data.team;
    });

    this.viewportSub = this.viewport.type$().subscribe(type => {
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

  onSaveImg(data: { file: File, img: ProfileImg }) {
    const {file, img} = data;

    // this.teamService.updateImg(file, img).subscribe();
  }

  onClickSidebarToggle($event: Event) {
    if (this.mobileNav) { this.mobileNav = false; }
    this.teamSidebar.toggleSidebar();

    $event.stopPropagation();
  }

  onClickMobileToggle($event: MouseEvent) {
    this.mobileNav = !this.mobileNav;

    $event.stopPropagation();
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
    this.viewportSub.unsubscribe();
  }
}
