import { Component, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngl-nav-dropdown-label',
  template: '<ng-content></ng-content>'
})
export class NavDropdownLabelComponent {
  @Output() focused = new EventEmitter<void>();

  @HostListener('mouseenter') onFocus() {
    this.focused.emit();
  }
}
