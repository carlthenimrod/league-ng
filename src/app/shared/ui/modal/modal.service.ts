import { Injectable, Type, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { UIModalComponent } from './modal.component';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UIModalService implements OnDestroy {
  private _modalRef: ComponentRef<UIModalComponent>;
  private _closedSubject = new Subject<any>();
  closed = this._closedSubject.asObservable();

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  open(componentType: Type<any>) {
    if (this._modalRef) { return; }

    this._create(componentType);

    this._modalRef.instance.close
      .subscribe(this._destroy.bind(this));
  }

  close(data?: any) {
    if (!this._modalRef) { return; }

    this._closedSubject.next(data);

    this._destroy();
  }

  private _create(componentType: Type<any>) {
    const factory = this.resolver.resolveComponentFactory(UIModalComponent);

    this._modalRef = factory.create(this.injector);
    this._modalRef.instance.componentType = componentType;

    this.document.body.appendChild((this._modalRef.hostView as EmbeddedViewRef<UIModalComponent>).rootNodes[0]);

    this.appRef.attachView(this._modalRef.hostView);
  }

  private _destroy() {
    this.appRef.detachView(this._modalRef.hostView);
    this._modalRef.destroy();
    delete this._modalRef;
  }

  ngOnDestroy() {
    this._closedSubject.complete();
  }
}
