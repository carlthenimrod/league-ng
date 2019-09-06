import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ViewportService } from '@app/services/viewport.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit, OnDestroy {
  @Output() linkClick = new EventEmitter<boolean>();
  isMobile: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.viewport.type$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
      });
  }

  onClick() {
    this.linkClick.emit(true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
