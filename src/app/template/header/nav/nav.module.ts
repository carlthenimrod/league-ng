import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { MobileNavToggleComponent } from './mobile-toggle/mobile-toggle.component';
import { MobileNavMenuComponent } from './mobile-menu/mobile-menu.component';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { NavDropdownComponent } from './nav-dropdown/nav-dropdown.component';
import { NavDropdownLabelComponent } from './nav-dropdown/nav-dropdown-label/nav-dropdown-label.component';
import { NavDropdownContentComponent } from './nav-dropdown/nav-dropdown-content/nav-dropdown-content.component';

@NgModule({
  declarations: [
    MobileNavComponent,
    MobileNavToggleComponent,
    MobileNavMenuComponent,
    DesktopNavComponent,
    NavDropdownComponent,
    NavDropdownLabelComponent,
    NavDropdownContentComponent
  ],
  exports: [
    MobileNavComponent,
    MobileNavToggleComponent,
    MobileNavMenuComponent,
    DesktopNavComponent,
    NavDropdownComponent,
    NavDropdownLabelComponent,
    NavDropdownContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavModule { }
