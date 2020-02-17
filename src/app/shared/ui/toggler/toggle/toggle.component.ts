import { Component, Input, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-toggle',
  styleUrls: ['./toggle.component.scss'],
  templateUrl: './toggle.component.html'
})
export class UIToggleComponent {
  @Input() label: string;
  @ContentChild('toggle', { static: false }) el: ElementRef;
  checked: boolean;

  constructor() {}

  onClick() {
    if (!this.el) { return; }

    (this.el.nativeElement as HTMLInputElement).click();
  }
}
