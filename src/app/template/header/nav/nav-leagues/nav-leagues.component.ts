import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { League } from '@app/models/league';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-leagues',
  templateUrl: './nav-leagues.component.html',
  styleUrls: ['./nav-leagues.component.scss']
})
export class NavLeaguesComponent implements OnInit, OnDestroy {
  @Input() leagues: League[];
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
