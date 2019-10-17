import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService implements OnDestroy {
  type: string;
  typeSubject = new BehaviorSubject<string>(null);
  type$ = this.typeSubject.pipe(distinctUntilChanged());
  unsubscribe$ = new Subject<void>();

  constructor() {
    this.findType();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.findType.bind(this));
  }

  findType() {
    this.type = window.innerWidth >= 576 ? 'desktop' : 'mobile';

    this.typeSubject.next(this.type);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
