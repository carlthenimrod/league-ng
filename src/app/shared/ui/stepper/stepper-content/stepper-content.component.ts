import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-stepper-content',
  styleUrls: ['./stepper-content.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class UIStepperContentComponent { }
