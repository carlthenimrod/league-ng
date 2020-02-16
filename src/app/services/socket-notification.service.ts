import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketNotificationService {
  constructor() { }

  handle(socket$: Observable<any>) {
    socket$
      .subscribe((data) => {
        console.log(data);
      });
  }

}

