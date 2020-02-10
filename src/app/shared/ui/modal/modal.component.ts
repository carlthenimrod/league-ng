import {
  Component, Input, Type, Output, EventEmitter, HostBinding,
  ViewChild, AfterViewInit, ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef,
  ViewEncapsulation, Injector, EmbeddedViewRef, Renderer2, Optional
} from '@angular/core';

import { lightboxTrigger } from './animations';

@Component({
  selector: 'ui-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [lightboxTrigger]
})
export class UIModalComponent implements AfterViewInit {
  @Input() componentType: Type<any>;
  @Output() close = new EventEmitter<void>();
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  @HostBinding('@lightbox') lightbox;

  constructor(
    @Optional() private injector?: Injector,
    @Optional() private ref?: ChangeDetectorRef,
    @Optional() private renderer?: Renderer2,
    @Optional() private resolver?: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    if (!this.componentType) { return; }

    const factory = this.resolver.resolveComponentFactory(this.componentType);
    const componentRef = factory.create(this.injector);

    this.renderer.addClass((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0], 'ui-modal-content');

    this.vc.clear();
    this.vc.insert(componentRef.hostView);

    this.ref.detectChanges();
  }

  onClickClose() {
    this.close.emit();
  }
}
