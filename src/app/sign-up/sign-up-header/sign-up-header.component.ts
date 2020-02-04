import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngl-sign-up-header',
  styleUrls: ['./sign-up-header.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class SignUpHeaderComponent { }
