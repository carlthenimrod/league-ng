import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, Subject } from 'rxjs';
import { tap, takeUntil, map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';

import { AuthResponse, Me } from '@app/models/auth';
import { AuthService } from '@app/auth/auth.service';
import { NotificationResponse } from '@app/models/notification';
import { SocketLeagueService } from './socket-league.service';
import { SocketTeamService } from './socket-team.service';
import { SocketNotification } from '@app/models/socket';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  api: string = environment.api;
  socket: SocketIOClient.Socket;
  socketSubject = new BehaviorSubject<SocketIOClient.Socket>(null);
  socket$ = this.socketSubject.asObservable();
  connectedSubject = new BehaviorSubject<boolean>(false);
  connected$ = this.connectedSubject.asObservable();

  notification$: Observable<NotificationResponse>;

  me: Me;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private socketLeague: SocketLeagueService,
    private socketTeam: SocketTeamService
  ) {
    this.socket = io(this.api, { autoConnect: false });
    this.socketSubject.next(this.socket);

    this.auth.me$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(me => {
        this.me = me;
        this.me ? this.connect() : this.disconnect();
      });

    this.eventHandlers();
  }

  private eventHandlers() {
    this.onConnect(fromEvent(this.socket, 'connect'));
    this.onDisconnect(fromEvent(this.socket, 'disconnect'));
    this.onAuthorized(fromEvent(this.socket, 'authorized'));

    this.socketLeague.handle(fromEvent(this.socket, 'league'));
    this.socketTeam.handle(fromEvent(this.socket, 'team'));

    this.notification$ = fromEvent<SocketNotification>(this.socket, 'notification')
      .pipe(map(d => d.notification));
  }

  private onConnect(connect$: Observable<void>) {
    connect$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.authorize());
  }

  private onDisconnect(disconnect$: Observable<string>) {
    disconnect$
      .pipe(
        tap(() => console.log('disconnected')),
        tap(() => this.connectedSubject.next(false)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(reason => {
        console.log(reason);
      });
  }

  private onAuthorized(authorized$: Observable<AuthResponse>) {
    authorized$
      .pipe(
        tap(() => console.log('connected')),
        tap(() => this.connectedSubject.next(true)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(response => this.auth.me.set$(response));
  }

  connect() {
    if (this.socket.connected) { return; }
    this.socket.open();
  }

  disconnect() {
    this.socket.close();
  }

  authorize() {
    if (!this.me) { return; }
    const { client, refresh_token } = this.me;
    this.socket.emit('authorize', { client, refresh_token });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
