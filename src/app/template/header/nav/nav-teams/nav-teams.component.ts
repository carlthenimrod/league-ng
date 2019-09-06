import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from '@app/models/team';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-teams',
  templateUrl: './nav-teams.component.html',
  styleUrls: ['./nav-teams.component.scss']
})
export class NavTeamsComponent implements OnInit {
  @Input() teams: Team[];
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
}
