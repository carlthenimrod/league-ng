import { Injectable, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Inject, Type, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalConfig, MODAL_DATA } from './modal';

@Injectable()
export class ModalService {
  modalRef: ComponentRef<ModalComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  open(componentType: Type<any>, config?: ModalConfig) {
    if (this.modalRef) { return; }

    const parent = config && config.injector ? config.injector : this.injector;
    const data = config && config.data ? config.data : {};

    const injector = Injector.create({
      providers: [{ provide: MODAL_DATA, useValue: data }],
      parent
    });

    this.modalRef = this.create(injector);
    this.modalRef.instance.componentType = componentType;
  }

  close() {
    this.destroy();
  }

  private create(injector: Injector): ComponentRef<ModalComponent> {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);

    const componentRef = factory.create(injector);
    const componentView = (componentRef.hostView as EmbeddedViewRef<ModalComponent>).rootNodes[0];

    this.document.body.appendChild(componentView);
    this.appRef.attachView(componentRef.hostView);

    componentRef.instance.close
      .subscribe(this.close.bind(this));

    return componentRef;
  }

  private destroy() {
    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
    delete this.modalRef;
  }
}
