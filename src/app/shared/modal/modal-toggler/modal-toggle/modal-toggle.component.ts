import { Component, Input, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal-toggle',
  styleUrls: ['./modal-toggle.component.scss'],
  templateUrl: './modal-toggle.component.html'
})
export class ModalToggleComponent {
  @Input() label: string;
  @ContentChild('toggle', { static: false }) el: ElementRef;
  checked: boolean;

  constructor() {}

  onClick() {
    if (!this.el) { return; }

    (this.el.nativeElement as HTMLInputElement).click();
  }
}
