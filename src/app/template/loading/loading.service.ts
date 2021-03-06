import { Injectable, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnDestroy {
  loadingSubject = new BehaviorSubject<boolean>(null);
  loading$ = this.loadingSubject.asObservable();
  unsubscribe$ = new Subject<void>();

  constructor(private router: Router) {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: RouterEvent) => {
        switch (true) {
          case event instanceof NavigationStart:
            this.loadingSubject.next(true);
            break;
          case event instanceof  NavigationEnd:
          case event instanceof  NavigationCancel:
          case event instanceof  NavigationError:
            this.loadingSubject.next(false);
            break;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
