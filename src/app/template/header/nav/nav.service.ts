import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, Inject, EmbeddedViewRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { filter, skipWhile, tap } from 'rxjs/operators';

import { ScrollService } from '@app/services/scroll.service';
import { ViewportService } from '@app/services/viewport.service';
import { MobileNavMenuComponent } from './mobile-menu/mobile-menu.component';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private _mobileMenu: ComponentRef<MobileNavMenuComponent>;

  constructor(
    private _appRef: ApplicationRef,
    @Inject(DOCUMENT) private _document: Document,
    private _injector: Injector,
    private _location: Location,
    private _resolver: ComponentFactoryResolver,
    private _scroll: ScrollService,
    private _router: Router,
    private _viewportService: ViewportService
  ) {
    this._viewportService.type$
      .pipe(
        filter(type => type !== 'mobile'),
        filter(_ => !!this._mobileMenu)
      )
      .subscribe(this._destroy.bind(this));

    this._router.events
      .pipe(
        skipWhile(_ => !this._mobileMenu || !this._mobileMenu.instance.open),
        filter(e => e instanceof NavigationEnd),
        tap(this._setSelected.bind(this))
      )
      .subscribe(_ => this.close());
  }

  toggle() {
    !this._mobileMenu || !this._mobileMenu.instance.open
      ? this.open()
      : this.close();
  }

  open() {
    if (!this._mobileMenu) { this._create(); }
    this._mobileMenu.instance.open = true;
    this._scroll.lock();
  }

  close() {
    if (!this._mobileMenu) { return; }
    this._mobileMenu.instance.open = false;
    this._scroll.unlock();
    this._setSelected();
  }

  private _setSelected() {
    const path = this._location.path().split('/');
    path.shift();

    this._mobileMenu.instance.selected =
    path[0] === 'user'
        ? 'user'
        : path[0] === 'league'
        ? 'leagues'
        : path[0] === 'team'
        ? 'teams'
        : path[0] === 'admin'
        ? 'admin'
        : 'home';
  }

  private _create() {
    this._mobileMenu = this._resolver
      .resolveComponentFactory(MobileNavMenuComponent)
      .create(this._injector);
    this._setSelected();

    this._appRef.attachView(this._mobileMenu.hostView);
    this._document.body.appendChild(
      (this._mobileMenu.hostView as EmbeddedViewRef<any>)
      .rootNodes[0]
    );

    this._mobileMenu.onDestroy(() => delete this._mobileMenu);
  }

  private _destroy() {
    this._scroll.unlock();
    this._mobileMenu.destroy();
  }
}
