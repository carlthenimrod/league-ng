import { Component, AfterContentInit, Attribute, ViewEncapsulation, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { UISelectComponent } from '../../select/select.component';
import { ControlDirective } from '../../form-field/control.directive';

@Component({
  selector: 'ui-modal-select',
  styleUrls: ['./modal-select.component.scss'],
  templateUrl: './modal-select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: ControlDirective, useExisting: UIModalSelectComponent }
  ]
})
export class UIModalSelectComponent extends UISelectComponent implements AfterContentInit {
  constructor(
    @Self() @Optional() ngControl: NgControl,
    @Attribute('multiple') multiple
  ) {
    super(ngControl, multiple);
    if (this.ngControl) { this.ngControl.valueAccessor = this; }
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
}
