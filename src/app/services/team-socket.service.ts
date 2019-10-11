import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, Observable, Subject, BehaviorSubject } from 'rxjs';

import { SocketService } from './socket.service';
import { SocketResponse, SocketData } from '@app/models/socket';
import { Message } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamSocketService implements OnDestroy {
  connected: BehaviorSubject<boolean>;
  team$: Observable<SocketResponse>;
  teamSub: Subscription;
  rosterSubject: Subject<SocketData> = new Subject();
  feedSubject: Subject<SocketData> = new Subject();
  typingSubject: Subject<SocketData> = new Subject();

  constructor(private socketService: SocketService) {
    this.connected = this.socketService.connectedSubject;

    this.team$ = fromEvent(this.socketService.socket, 'team');

    this.teamSub = this.team$.subscribe(response => {
      switch (response.event) {
        case 'feed':
          this.feedSubject.next(response.data);
          break;
        case 'typing':
          this.typingSubject.next(response.data);
          break;
        case 'roster':
          this.rosterSubject.next(response.data);
          break;
      }
    });
  }

  join(teamId: string) {
    this.socketService.socket.emit('join', teamId);
  }

  leave(teamId: string) {
    this.socketService.socket.emit('leave', teamId);
  }

  feed(teamId: string, action: string, message: Message) {
    this.socketService.socket.emit('feed', {
      teamId,
      action,
      message
    });
  }

  feed$() {
    return this.feedSubject.asObservable();
  }

  typing(teamId: string, isTyping: boolean) {
    this.socketService.socket.emit('typing', {
      teamId,
      isTyping
    });
  }

  typing$() {
    return this.typingSubject.asObservable();
  }

  roster$() {
    return this.rosterSubject.asObservable();
  }

  connected$() {
    return this.connected.asObservable();
  }

  ngOnDestroy() {
    this.teamSub.unsubscribe();
  }
}
