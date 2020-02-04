import { Component, ViewEncapsulation } from '@angular/core';

import { UIFormFieldComponent } from '../../form-field/form-field.component';

@Component({
  selector: 'ui-modal-form-field',
  styleUrls: ['./modal-form-field.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class UIModalFormFieldComponent extends UIFormFieldComponent { }
