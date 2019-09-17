import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService implements OnDestroy {
  viewport: string;
  viewportSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  unsubscribe$ = new Subject<void>();

  constructor() {
    this.findViewportType();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.findViewportType();
      });
  }

  findViewportType() {
    const width = window.innerWidth;

    if (width >= 576) {
      if (this.viewport === 'desktop') { return; }
      this.viewport = 'desktop';
    } else {
      if (this.viewport === 'mobile') { return; }
      this.viewport = 'mobile';
    }

    this.viewportSubject.next(this.viewport);
  }

  type$() {
    return this.viewportSubject.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
