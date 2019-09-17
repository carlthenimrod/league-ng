import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { League } from '@app/models/league';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-league-header',
  templateUrl: './league-header.component.html',
  styleUrls: ['./league-header.component.scss']
})
export class LeagueHeaderComponent implements OnInit, OnDestroy {
  @Input() league: League;
  @Input() selected: string;
  @Output() navClick = new EventEmitter<string>();
  isMobile: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    console.log(this.selected);
    this.viewport.type$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
      });
  }

  onClick(clicked: string) {
    if (this.selected === clicked) { return; }
    this.navClick.emit(clicked);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
