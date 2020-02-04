import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { GameGroup } from '@app/models/league';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @Input() schedule: GameGroup[];
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.auth.me$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(me => console.log(me));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
