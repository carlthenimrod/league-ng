import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Auth } from '@app/models/auth';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit, OnDestroy {
  @Input() auth: Auth;
  @Output() linkClick = new EventEmitter<boolean>();
  isMobile: boolean;
  unsubscribe$ = new Subject<void>();

  constructor(private viewport: ViewportService) { }

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
