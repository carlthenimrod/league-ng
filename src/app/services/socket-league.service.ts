import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { SocketLeagueData } from '@app/models/socket';
import { League } from '@app/models/league';
import { MeService } from './me.service';

@Injectable({
  providedIn: 'root'
})
export class SocketLeagueService implements OnDestroy {
  socket: SocketIOClient.Socket;
  unsubscribe$ = new Subject<void>();

  constructor(
    private meService: MeService,
    private localStorage: LocalStorageService
  ) {}

  handle(socketLeague$: Observable<SocketLeagueData>) {
    socketLeague$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ league, action }) => {
        switch (action) {
          case 'new': {
            const leagues = this.localStorage.get<League[]>('leagues');
            leagues instanceof Array
              ? this.localStorage.set('leagues', [...leagues, league])
              : this.localStorage.set('leagues', [league]);
            break;
          }
          case 'update': {
            const leagues = this.localStorage.get<League[]>('leagues');
            if (!(leagues instanceof Array)) { return; }
            const index = leagues.findIndex(l => l._id === league._id);

            if (index !== -1) { leagues[index] = league; }
            this.localStorage.set('leagues', leagues);
            break;
          }
          case 'remove': {
            const leagues = this.localStorage.get<League[]>('leagues');
            if (!(leagues instanceof Array)) { return; }
            const index = leagues.findIndex(l => l._id === league._id);

            leagues.splice(index, 1);
            this.localStorage.set('leagues', leagues);
            break;
          }
        }

        this.meService.get$();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
