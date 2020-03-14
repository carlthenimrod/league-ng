import { Component, ContentChild, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';

import { UIErrorComponent } from './error/error.component';
import { UIHintComponent } from './hint/hint.component';
import { ControlDirective } from './control.directive';

@Component({
  selector: 'ui-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UIFormFieldComponent {
  @ContentChild(UIErrorComponent) error: UIErrorComponent;
  @ContentChild(UIHintComponent) hint: UIHintComponent;
  @ContentChild(ControlDirective) control: ControlDirective;

  @HostBinding('class.focused')
  get focused() {
    return this.control ? this.control.focused : false;
  }

  @HostBinding('class.autofilled')
  get autofilled() {
    return this.control ? this.control.autofilled : false;
  }

  @HostBinding('class.ng-invalid')
  get invalid() {
    return this.control && this.control.ngControl
      ? this.control.ngControl.invalid : false;
  }

  @HostBinding('class.ng-touched')
  get touched() {
    return this.control && this.control.ngControl
      ? this.control.ngControl.touched : false;
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    if (this.control) { this.control.onContainerClick(event); }
  }
}
