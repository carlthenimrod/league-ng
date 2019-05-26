import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, Observable, Subject } from 'rxjs';

import { SocketService } from './socket.service';
import { SocketResponse, RosterUpdate } from '@app/models/socket';

@Injectable({
  providedIn: 'root'
})
export class TeamSocketService implements OnDestroy {
  connected = false;
  connectedSub: Subscription;
  team$: Observable<SocketResponse>;
  teamSub: Subscription;
  rosterSubject: Subject<RosterUpdate[]> = new Subject();

  constructor(private socketService: SocketService) {
    this.team$ = fromEvent(this.socketService.socket, 'team');

    this.teamSub = this.team$.subscribe(payload => {
      switch (payload.action) {
        case 'roster':
          this.rosterSubject.next(<RosterUpdate[]>payload.data);
          break;
      }
    });
  }

  join(teamId: string) {
    this.connectedSub = this.socketService.connected.subscribe(connected => {
      if (connected) {
        this.socketService.socket.emit('join', teamId);
        this.connected = true;
      } else {
        this.connected = false;
      }
    });
  }

  leave(teamId: string) {
    this.socketService.socket.emit('leave', teamId);
  }

  roster$() {
    return this.rosterSubject.asObservable();
  }

  ngOnDestroy() {
    this.connectedSub.unsubscribe();
    this.teamSub.unsubscribe();
  }
}
