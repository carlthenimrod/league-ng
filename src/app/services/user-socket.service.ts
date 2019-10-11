import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, Subscription, Subject } from 'rxjs';

import { SocketService } from './socket.service';
import { SocketResponse, SocketData } from '@app/models/socket';

@Injectable({
  providedIn: 'root'
})
export class UserSocketService implements OnDestroy {
  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user$: Observable<SocketResponse>;
  userSub: Subscription;
  messageSubject: Subject<SocketData> = new Subject();

  constructor(private socketService: SocketService) {
    this.connected = this.socketService.connectedSubject;

    this.user$ = fromEvent(this.socketService.socket, 'user');

    this.userSub = this.user$.subscribe(response => {
      switch (response.event) {
        case 'message':
          this.messageSubject.next(response.data);
          break;
      }
    });
  }

  message$() {
    return this.messageSubject.asObservable();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
