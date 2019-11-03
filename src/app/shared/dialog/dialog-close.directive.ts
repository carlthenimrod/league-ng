import { Directive, HostListener } from '@angular/core';

import { DialogService } from './dialog.service';

@Directive({
  selector: '[appDialogClose]'
})
export class DialogCloseDirective {
  constructor(private dialog: DialogService) {}

  @HostListener('click', ['$event']) onClick(e: Event) {
    e.preventDefault();
    this.dialog.close();
  }
}
