import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-items',
  styleUrls: ['./admin-items.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class AdminItemsComponent { }
