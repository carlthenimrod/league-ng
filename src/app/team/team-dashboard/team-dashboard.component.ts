import { Component, OnInit, HostListener, HostBinding, OnDestroy } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSidebarService } from '@app/services/team-sidebar.service';
import { ProfileImg } from '@app/models/profile-img';
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
  team: Team;
  mobileNav = false;
  selected = 'home';
  viewportType: string;
  unsubscribe$ = new Subject<void>();

  constructor(
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
    this.teamService.team$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(team =>
        this.team = team
      );

    combineLatest([ this.viewport.type$, this.teamSidebar.isOpen$ ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ type, isOpen ]) =>
        this.sidebarState = isOpen
          ? type === 'mobile'
            ? 'mobileOpen'
            : 'desktopOpen'
          : type === 'mobile'
            ? 'mobileClose'
            : 'desktopClose'
      );
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
