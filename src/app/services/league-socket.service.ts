import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { LocalStorageService } from './local-storage.service';
import { LeagueSocketData } from '@app/models/socket';
import { League } from '@app/models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueSocketService implements OnDestroy {
  socket: SocketIOClient.Socket;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private localStorage: LocalStorageService
  ) {}

  handle(league$: Observable<LeagueSocketData>) {
    league$
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

        this.auth.getMe();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
