import { Component, ContentChild, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';

import { UIInputDirective } from '../input/input.directive';
import { UIErrorComponent } from './error/error.component';
import { UIHintComponent } from './hint/hint.component';

@Component({
  selector: 'ui-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UIFormFieldComponent {
  @ContentChild(UIInputDirective, { static: false }) input: UIInputDirective;
  @ContentChild(UIErrorComponent, { static: false }) error: UIErrorComponent;
  @ContentChild(UIHintComponent, { static: false }) hint: UIHintComponent;

  @HostBinding('class.focused')
  get focused() {
    return this.input ? this.input.focused : false;
  }

  @HostBinding('class.autofilled')
  get autofilled() {
    return this.input ? this.input.autofilled : false;
  }

  @HostBinding('class.ng-invalid')
  get invalid() {
    return this.input && this.input.ngControl
      ? this.input.ngControl.invalid : false;
  }

  @HostBinding('class.ng-touched')
  get touched() {
    return this.input && this.input.ngControl
      ? this.input.ngControl.touched : false;
  }

  @HostListener('click') onClick() {
    if (this.input && !this.input.focused) {
      (this.input.el.nativeElement as HTMLInputElement).focus();
    }
  }
}
