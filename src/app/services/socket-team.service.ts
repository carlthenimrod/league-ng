import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SocketTeamData } from '@app/models/socket';

@Injectable({
  providedIn: 'root',
})
export class SocketTeamService implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor() {}

  handle(socketTeam$: Observable<SocketTeamData>) {
    socketTeam$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
