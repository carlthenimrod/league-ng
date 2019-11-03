import { Injectable, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Inject, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  dialogRef: ComponentRef<DialogComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver
  ) { }

  open(componentType: Type<any>, injector: Injector) {
    this.dialogRef = this.create(injector);
    this.dialogRef.instance.componentType = componentType;
  }

  close() {
    this.destroy();
  }

  private create(injector: Injector): ComponentRef<DialogComponent> {
    const factory = this.resolver.resolveComponentFactory(DialogComponent);

    const componentRef = factory.create(injector);
    const componentView = (componentRef.hostView as EmbeddedViewRef<DialogComponent>).rootNodes[0];

    this.document.body.appendChild(componentView);
    this.appRef.attachView(componentRef.hostView);

    componentRef.instance.close
      .subscribe(this.close.bind(this));

    return componentRef;
  }

  private destroy() {
    this.appRef.detachView(this.dialogRef.hostView);
    this.dialogRef.destroy();
  }
}
