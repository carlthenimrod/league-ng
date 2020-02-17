import { Injectable, Type, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

import { UIModalComponent } from './modal.component';
import { ModalConfig, MODAL_DATA } from './modal';

@Injectable()
export class UIModalService implements OnDestroy {
  private _modalRef: ComponentRef<UIModalComponent>;

  protected _componentTypeWrapper: Type<UIModalComponent> = UIModalComponent;

  private _closedSubject = new Subject<any>();
  closed$ = this._closedSubject.asObservable();

  constructor(
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  open(componentType?: Type<any>, config?: ModalConfig) {
    if (this._modalRef) { return; }

    this._create(componentType, config);

    this._modalRef.instance.close
      .subscribe(this._destroy.bind(this));
  }

  close(data?: any) {
    if (!this._modalRef) { return; }

    this._closedSubject.next(data);

    this._destroy();
  }

  toggle(componentType?: Type<any>) {
    !this._modalRef ? this.open(componentType) : this.close();
  }

  private _create(componentType?: Type<any>, config?: ModalConfig) {
    const factory = this.resolver.resolveComponentFactory(this._componentTypeWrapper);

    const data = config && config.data ? config.data : { };
    const parent = config && config.injector ? config.injector : this.injector;

    const injector = Injector.create({
      providers: [{ provide: MODAL_DATA, useValue: data }],
      parent
    });

    this._modalRef = factory.create(injector);
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
