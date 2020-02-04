import { Component, AfterContentInit, Attribute } from '@angular/core';

import { UISelectComponent } from '../../select/select.component';

@Component({
  selector: 'ui-modal-select',
  styleUrls: ['./modal-select.component.scss'],
  templateUrl: './modal-select.component.html'
})
export class UIModalSelectComponent extends UISelectComponent implements AfterContentInit {
  constructor(@Attribute('multiple') multiple) {
    super(multiple);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
}
