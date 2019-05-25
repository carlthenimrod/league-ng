import { Injectable } from '@angular/core';

import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class TeamSocketService {
  socket: SocketIOClient.Socket;

  constructor(
    private socketService: SocketService
  ) {
    this.socket = this.socketService.socket;
  }

  join(teamId: string) {
    this.socket.emit('join', teamId);

    this.socket.on('joined', msg => {
      console.log(msg);
    });

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
