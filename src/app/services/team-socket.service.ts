import { Injectable } from '@angular/core';
import { Subscription, fromEvent, Observable } from 'rxjs';

import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class TeamSocketService {
  socket: SocketIOClient.Socket;
  socketSubscription: Subscription;

  constructor(
    private socketService: SocketService
  ) {
    this.socket = this.socketService.socket;
  }

  join(teamId: string) {
    this.socket.emit('join', teamId);

    const obs: Observable<any> = fromEvent(this.socket, 'team');

    this.socket.on('team', payload => {
      if (payload.action === 'roster') {
        console.log(payload.roster);
      }
    });
  }

  leave(teamId: string) {
    this.socket.emit('leave', teamId);
  }
}
