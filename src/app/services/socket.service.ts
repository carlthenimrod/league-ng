import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';

import { AuthService } from '@app/auth/auth.service';
import { Auth, Me } from '@app/models/auth';


@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  api: string = environment.api;
  socket: SocketIOClient.Socket;
  connectedSubject = new BehaviorSubject<boolean>(false);
  connected$ = this.connectedSubject.asObservable();
  me: Me;
  unsubscribe$ = new Subject<void>();

  constructor(private auth: AuthService) {
    this.socket = io(this.api, { autoConnect: false });

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

  private onAuthorized(authorized$: Observable<Auth>) {
    authorized$
      .pipe(
        tap(() => console.log('connected')),
        tap(() => this.connectedSubject.next(true)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(auth => this.auth.setMe(auth));
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
