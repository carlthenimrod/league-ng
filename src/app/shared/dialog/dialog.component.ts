import { Component, OnInit, ViewContainerRef, ViewChild, Type, AfterViewInit, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChild('vc', { static: false, read: ViewContainerRef }) vc: ViewContainerRef;
  componentType: Type<any>;

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const factory = this.resolver.resolveComponentFactory(this.componentType);

    this.vc.clear();
    this.vc.createComponent(factory);
  }
}
