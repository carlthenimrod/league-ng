import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService implements OnDestroy {
  typeSubject = new BehaviorSubject<string>(null);
  type$ = this.typeSubject.pipe(distinctUntilChanged());
  widthSubject = new BehaviorSubject<number>(null);
  width$ = this.widthSubject.pipe(distinctUntilChanged());
  unsubscribe$ = new Subject<void>();

  constructor() {
    this.update(window);

    fromEvent<Event>(window, 'resize')
      .pipe<Window, Window>(
        map(event => event.target as Window),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(this.update.bind(this));
  }

  update(window: Window) {
    this.typeSubject.next(window.innerWidth >= 576 ? 'desktop' : 'mobile');
    this.widthSubject.next(window.innerWidth);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
