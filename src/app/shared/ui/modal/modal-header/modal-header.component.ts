import { Component, ViewEncapsulation } from '@angular/core';

import { UIModalService } from '../modal.service';

@Component({
  selector: 'ui-modal-header',
  styleUrls: ['./modal-header.component.scss'],
  templateUrl: './modal-header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UIModalHeaderComponent {
  constructor(private modal: UIModalService) { }

  onClickClose() {
    this.modal.close();
  }
}
