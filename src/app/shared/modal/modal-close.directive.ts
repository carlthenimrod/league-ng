import { Directive, HostListener } from '@angular/core';

import { ModalService } from './modal.service';

@Directive({
  selector: '[appModalClose]'
})
export class ModalCloseDirective {
  constructor(private modal: ModalService) {}

  @HostListener('click', ['$event']) onClick(e: Event) {
    e.preventDefault();
    this.modal.close();
  }
}
