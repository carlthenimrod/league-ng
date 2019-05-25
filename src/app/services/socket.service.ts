import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';

import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/models/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  api: string = environment.api;
  socket: SocketIOClient.Socket;
  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private auth: AuthService) {}

  connect() {
    if (!this.auth.loggedIn()) { return; }

    const auth: Auth = this.auth.getAuth();

    this.socket = io(this.api, { query: auth });

    this.socket.on('connect', () => {
      this.connected.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });

    this.socket.on('error', error => {
      console.log(error);
    });
  }
}
