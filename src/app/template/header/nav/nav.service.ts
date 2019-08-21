import { Injectable, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, Inject, EmbeddedViewRef } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Subscription, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NavComponent } from './nav.component';
import { ViewportService } from '@app/services/viewport.service';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService implements OnDestroy {
  componentRef: ComponentRef<NavComponent>;
  desktopCtn: ViewContainerRef;
  navStatusSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  navStatus: string;
  pathSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  subscription: Subscription = new Subscription();
  viewportType: string;

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private location: Location,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private viewport: ViewportService
  ) { 
    this.subscription.add(this.viewport.$viewportType().subscribe(type => {
      this.viewportType = type;

      this.updateNav();
    }));

    this.subscription.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getPath()));
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

  $path() {
    return this.pathSubject.asObservable();
  }

  toggleNav() {
    if (this.viewportType !== 'mobile') { return; }

    if (this.navStatus !== 'mobileOpen') {
      this.navStatus = 'mobileOpen';
      this.componentRef.instance.navMenu = this.navStatus;
      this.navStatusSubject.next(this.navStatus);

      this.document.body.classList.add('no-scroll');
    } else {
      this.navStatus = 'mobileClose';
      this.componentRef.instance.navMenu = this.navStatus;
      this.navStatusSubject.next(this.navStatus);

      this.document.body.classList.remove('no-scroll');
    }
  }

  $navStatus() {
    return this.navStatusSubject.asObservable();
  }

  createNav() {
    const factory = this.resolver.resolveComponentFactory(NavComponent);
    
    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.$path = this.$path();
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
    this.componentRef.instance.navMenu = this.navStatus;
    this.navStatusSubject.next('mobileClose');
  }

  removeMobile() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  insertDesktop() {
    this.desktopCtn.insert(this.componentRef.hostView);

    this.navStatus = 'desktop';
    this.componentRef.instance.navMenu = this.navStatus;
    this.navStatusSubject.next('desktop');
  }

  removeDesktop() {
    this.desktopCtn.clear();
    this.componentRef.destroy();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
