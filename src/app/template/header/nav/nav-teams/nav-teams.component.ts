import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { NavService } from '../nav.service';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-teams',
  templateUrl: './nav-teams.component.html',
  styleUrls: ['./nav-teams.component.scss']
})
export class NavTeamsComponent implements OnInit, OnDestroy {
  @Input() teams: Team[];
  isMobile: boolean;
  showMenu: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private navService: NavService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.viewport.type$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
      });
  }

  onClick(url?: string[]) {
    this.navService.navigate(url);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
