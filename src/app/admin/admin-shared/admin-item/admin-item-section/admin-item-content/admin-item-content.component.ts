import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-item-content',
  styleUrls: ['./admin-item-content.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class AdminItemContentComponent { }
