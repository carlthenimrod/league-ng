import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  typeSubject = new BehaviorSubject<string>(null);
  type$ = this.typeSubject.pipe(distinctUntilChanged());
  widthSubject = new BehaviorSubject<number>(null);
  width$ = this.widthSubject.pipe(distinctUntilChanged());
  unsubscribe$ = new Subject<void>();

  constructor() {
    this.update(window);

    fromEvent<Event>(window, 'resize')
      .pipe<Window>(
        map(event => event.target as Window)
      )
      .subscribe(this.update.bind(this));
  }

  update(window: Window) {
    this.typeSubject.next(window.innerWidth >= 576 ? 'desktop' : 'mobile');
    this.widthSubject.next(window.innerWidth);
  }
}
