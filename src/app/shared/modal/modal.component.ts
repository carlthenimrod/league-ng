import {
  Component, ViewChild, Type, AfterViewInit,
  ComponentFactoryResolver, HostBinding, Output, EventEmitter,
  HostListener, Injector, ChangeDetectorRef, ViewContainerRef,
  Renderer2, EmbeddedViewRef, ViewEncapsulation
} from '@angular/core';

import { lightboxTrigger } from './animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [lightboxTrigger]
})
export class ModalComponent implements AfterViewInit {
  @Output() close = new EventEmitter<boolean>();
  @ViewChild('vc', { static: false, read: ViewContainerRef }) vc: ViewContainerRef;
  @HostBinding('@lightbox') lightbox;
  componentType: Type<any>;

  @HostListener('document:keydown.escape') onKeydownHandler() {
    this.close.emit(true);
  }

  constructor(
    private cd: ChangeDetectorRef,
    private injector: Injector,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    const factory = this.resolver.resolveComponentFactory(this.componentType);
    const componentRef = factory.create(this.injector);

    this.renderer.addClass((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0], 'app-modal-content');

    this.vc.clear();
    this.vc.insert(componentRef.hostView);
    this.cd.detectChanges();
  }

  onClickClose() {
    this.close.emit(true);
  }
}