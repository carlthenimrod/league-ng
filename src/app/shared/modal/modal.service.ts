import { Injectable, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Inject, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
  modalRef: ComponentRef<ModalComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver
  ) { }

  open(componentType: Type<any>, injector: Injector) {
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
  }
}
