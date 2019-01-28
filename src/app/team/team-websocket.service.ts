import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { timer, race, of } from 'rxjs';
import { concatMap, delay, mapTo, tap, filter, take, retry, share } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class TeamWebsocketService {
  ws: string = environment.ws;
  socket$: WebSocketSubject<any>;

  connect(teamId: string) {
    const url = this.ws + `teams/${teamId}`;

    this.socket$ = new WebSocketSubject(url);
  }

  connection() {
    return timer(0, 5000).pipe(
      tap(() => this.socket$.next('ping')),
      concatMap(() => {
        return race(
          of(false).pipe(delay(30000)),
          this.pong()
        ).pipe(
          take(1)
        );
      })
    );
  }

  pong() {
    return this.socket$.pipe(
      filter(v => v === 'ping'),
      mapTo(true),
      share(),
      retry()
    );
  }

  status() {
    return of('test');
  }

  messages() {
    return this.socket$.pipe(
      tap(val => {
        console.log(typeof val);
      })
    );
  }
}
