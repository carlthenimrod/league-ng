import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngl-logo',
  styleUrls: ['./logo.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent { }
