import { Directive, HostListener } from '@angular/core';

import { UIModalService } from '../modal.service';

@Directive({
  selector: '[uiModalClose]'
})
export class UIModalCloseDirective {
  @HostListener('click', ['$event']) onClick($event: Event) {
    $event.preventDefault();

    this.modal.close();
  }

  constructor(private modal: UIModalService) { }
}
