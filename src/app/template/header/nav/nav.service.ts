import { Injectable, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, Inject, EmbeddedViewRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, BehaviorSubject } from 'rxjs';

import { NavComponent } from './nav.component';
import { ViewportService } from '@app/services/viewport.service';

@Injectable({
  providedIn: 'root'
})
export class NavService implements OnDestroy {
  componentRef: ComponentRef<NavComponent>;
  desktopCtn: ViewContainerRef;
  navStatusSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  navStatus: string;
  viewportType: string;
  viewportSub: Subscription;

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private viewport: ViewportService
  ) { 
    this.viewportSub = this.viewport.$viewportType().subscribe(type => {
      this.viewportType = type;

      this.updateNav();
    });
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

  toggleNav() {
    if (this.viewportType !== 'mobile') { return; }

    if (this.navStatus !== 'mobileOpen') {
      this.navStatus = 'mobileOpen';
      this.componentRef.instance.navStatus = 'mobileOpen';
      this.navStatusSubject.next(this.navStatus);
    } else {
      this.navStatus = 'mobileClose';
      this.componentRef.instance.navStatus = 'mobileClose';
      this.navStatusSubject.next(this.navStatus);
    }
  }

  $navStatus() {
    return this.navStatusSubject.asObservable();
  }

  createNav() {
    const factory = this.resolver.resolveComponentFactory(NavComponent);
    
    this.componentRef = factory.create(this.injector);
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
    this.componentRef.instance.navStatus = 'mobileClose';
    this.navStatusSubject.next('mobileClose');
  }

  removeMobile() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  insertDesktop() {
    this.desktopCtn.insert(this.componentRef.hostView);

    this.navStatus = 'desktop';
    this.componentRef.instance.navStatus = 'desktop';
    this.navStatusSubject.next('desktop');
  }

  removeDesktop() {
    this.desktopCtn.clear();
    this.componentRef.destroy();
  }

  ngOnDestroy() {
    this.viewportSub.unsubscribe();
  }
}
