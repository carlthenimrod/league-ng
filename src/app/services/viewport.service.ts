import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportService implements OnDestroy {
  windowSub: Subscription;
  viewport: string;
  viewportSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() {
    this.findViewportType();

    this.windowSub = fromEvent(window, 'resize').subscribe(() => {
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
    this.windowSub.unsubscribe();
  }
}
