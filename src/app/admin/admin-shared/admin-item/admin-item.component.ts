import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-item',
  styleUrls: ['./admin-item.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class AdminItemComponent { }
