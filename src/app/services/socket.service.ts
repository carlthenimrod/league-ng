import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '@env/environment';

import { Auth, AuthResponse } from '@app/models/auth';
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
    return new Promise<AuthResponse>((resolve, reject) => {
      const { client, refresh_token } = auth;

      this.socket = io(this.api);

      this.socket.on('connect', () => {
        this.socket.emit('authorize', { client, refresh_token });

        this.socket.on('authorized', (authResponse: AuthResponse) => {
          this.connected.next(true);
          resolve(authResponse);
        });
      });

      this.socket.on('disconnect', () => {
        this.connected.next(false);
        reject(null);
      });
    });
  }

  disconnect() {
    if (!this.socket) { return; }
    this.socket.close();
  }
}
