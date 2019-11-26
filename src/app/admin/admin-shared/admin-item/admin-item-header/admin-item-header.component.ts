import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-item-header',
  styleUrls: ['./admin-item-header.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class AdminItemHeaderComponent { }
