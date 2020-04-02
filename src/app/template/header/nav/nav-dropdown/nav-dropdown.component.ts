import { Component, ContentChild, AfterContentInit, HostListener } from '@angular/core';

import { NavDropdownLabelComponent } from './nav-dropdown-label/nav-dropdown-label.component';
import { NavDropdownContentComponent } from './nav-dropdown-content/nav-dropdown-content.component';

@Component({
  selector: 'ngl-nav-dropdown',
  template: '<ng-content></ng-content>'
})
export class NavDropdownComponent implements AfterContentInit {
  @ContentChild(NavDropdownLabelComponent) label: NavDropdownLabelComponent;
  @ContentChild(NavDropdownContentComponent) content: NavDropdownContentComponent;

  @HostListener('mouseleave') onBlur() {
    this.content.open = false;
  }

  ngAfterContentInit() {
    this.label.focused
      .subscribe(_ => this.content.open = true);
  }
}
