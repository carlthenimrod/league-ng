import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-item-section',
  styleUrls: ['./admin-item-section.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class AdminItemSectionComponent { }
