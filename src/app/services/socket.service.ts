import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';

import { AuthResponse, Me } from '@app/models/auth';
import { UserSocketData } from '@app/models/socket';
import { NotificationResponse } from '@app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _api: string = environment.api;

  private _socket: SocketIOClient.Socket;
  private _socketSubject = new BehaviorSubject<SocketIOClient.Socket>(null);
  socket$ = this._socketSubject.asObservable();

  private _connectedSubject = new BehaviorSubject<boolean>(false);
  connected$ = this._connectedSubject.asObservable();

  authorized$: Observable<AuthResponse>;
  notification$: Observable<NotificationResponse>;
  user$: Observable<any>;

  me: Me;

  constructor() {
    this._socket = io(this._api, { autoConnect: false });
    this._socketSubject.next(this._socket);

    this._eventHandlers();
  }

  private _eventHandlers() {
    fromEvent(this._socket, 'connect')
      .subscribe(this._authorize.bind(this));

    fromEvent(this._socket, 'disconnect')
      .pipe(
        tap(() => console.log('disconnected')),
        tap(() => this._connectedSubject.next(false))
      )
      .subscribe(reason => console.error(reason));

    this.authorized$ = fromEvent<AuthResponse>(this._socket, 'authorized')
      .pipe(
        tap(() => console.log('connected')),
        tap(() => this._connectedSubject.next(true))
      );

    this.notification$ = fromEvent<NotificationResponse>(this._socket, 'notification');

    this.user$ = fromEvent<UserSocketData>(this._socket, 'user');
  }

  private _authorize() {
    const client = localStorage.getItem('client');
    const refresh_token = localStorage.getItem('refresh_token');

    this._socket.emit('authorize', { client, refresh_token });
  }

  connect() {
    if (this._socket.connected) { return; }
    this._socket.open();
  }

  disconnect() {
    this._socket.close();
  }
}
