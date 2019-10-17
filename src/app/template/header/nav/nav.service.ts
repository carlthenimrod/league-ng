import { Injectable, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, Inject, EmbeddedViewRef } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoadingService } from '@app/template/loading/loading.service';
import { NavComponent } from './nav.component';
import { ViewportService } from '@app/services/viewport.service';

@Injectable({
  providedIn: 'root'
})
export class NavService implements OnDestroy {
  componentRef: ComponentRef<NavComponent>;
  desktopCtn: ViewContainerRef;
  loading: boolean;
  navStatusSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  navStatus: string;
  pathSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  unsubscribe$ = new Subject<void>();
  viewportType: string;

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private loadingService: LoadingService,
    private location: Location,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private viewport: ViewportService
  ) {
    this.viewport.type$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.viewportType = type;
        this.updateNav();
      });

    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.getPath();
          this.closeNav();
        }
      });

    this.loadingService.loading$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loading => this.loading = loading);
  }

  init(desktopCtn: ViewContainerRef) {
    this.desktopCtn = desktopCtn;
    this.createNav();

    if (this.viewportType === 'mobile') {
      this.insertMobile();
    } else {
      this.insertDesktop();
    }
  }

  getPath() {
    const path = this.location.path().split('/');
    path.shift();

    this.pathSubject.next(path);
  }

  path$() {
    return this.pathSubject.asObservable();
  }

  navigate(url?: string[]) {
    if (this.loading) { return; }

    const path = url ? '/' + url.join('/') : '/';
    const currentUrl = this.router.url;

    if (path === currentUrl && this.viewportType === 'mobile') {
      this.closeNav();
    } else {
      this.router.navigateByUrl(path);
    }
  }

  toggleNav() {
    if (this.viewportType !== 'mobile') { return; }

    if (this.navStatus !== 'mobileOpen') {
      this.openNav();
    } else {
      this.closeNav();
    }
  }

  openNav() {
    if (this.viewportType !== 'mobile') { return; }
    this.navStatus = 'mobileOpen';
    this.componentRef.instance.navOpen = true;
    this.navStatusSubject.next(this.navStatus);
  }

  closeNav() {
    if (this.viewportType !== 'mobile') { return; }
    this.navStatus = 'mobileClose';
    this.componentRef.instance.navOpen = false;
    this.navStatusSubject.next(this.navStatus);
  }

  $navStatus() {
    return this.navStatusSubject.asObservable();
  }

  createNav() {
    const factory = this.resolver.resolveComponentFactory(NavComponent);

    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.path$ = this.path$();
  }

  updateNav() {
    if (!this.componentRef) { return; }

    if (this.viewportType === 'mobile') {
      this.removeDesktop();
      this.createNav();
      this.insertMobile();
    } else {
      this.removeMobile();
      this.createNav();
      this.insertDesktop();
    }
  }

  insertMobile() {
    this.appRef.attachView(this.componentRef.hostView);

    const componentView = this.componentRef.hostView as EmbeddedViewRef<NavComponent>;
    const domEl = componentView.rootNodes[0];

    this.document.body.appendChild(domEl);

    this.navStatus = 'mobileClose';
    this.componentRef.instance.navOpen = false;
    this.navStatusSubject.next('mobileClose');
  }

  removeMobile() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  insertDesktop() {
    this.desktopCtn.insert(this.componentRef.hostView);

    this.navStatus = 'desktop';
    this.navStatusSubject.next('desktop');
  }

  removeDesktop() {
    this.desktopCtn.clear();
    this.componentRef.destroy();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
