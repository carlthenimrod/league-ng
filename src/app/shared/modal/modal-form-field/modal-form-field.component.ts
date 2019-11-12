import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-form-field',
  template: '<ng-content></ng-content>',
  styleUrls: ['./modal-form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFormFieldComponent { }
