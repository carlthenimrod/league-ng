import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavService } from '../nav.service';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  showMenu: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private navService: NavService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.viewport.type$()
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
