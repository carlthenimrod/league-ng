import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ngl-nav-dropdown-content',
  styles: [`
    :host {
      display: none;
    }

    :host(.open) {
      display: block;
    }
  `],
  template: '<ng-content></ng-content>'
})
export class NavDropdownContentComponent {
  @Input() @HostBinding('class.open') open: boolean;
}
