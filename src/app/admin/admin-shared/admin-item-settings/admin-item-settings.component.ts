import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-item-settings',
  styleUrls: ['./admin-item-settings.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class AdminItemSettingsComponent { }
