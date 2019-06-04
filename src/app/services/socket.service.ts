import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';

import { Auth } from '@app/models/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  api: string = environment.api;
  socket: SocketIOClient.Socket;
  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  connect(auth: Auth) {
    this.socket = io(this.api, { query: auth });

    this.socket.on('connect', () => {
      this.connected.next(true);
    });

    this.socket.on('disconnect', () => {
      this.connected.next(false);
    });

    this.socket.on('error', error => {
      this.connected.next(false);
    });
  }

  disconnect() {
    if (!this.socket) { return; }

    this.socket.close();
    delete this.socket;
  }
}
