import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-stepper-content',
  styleUrls: ['./modal-stepper-content.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class ModalStepperContentComponent { }
