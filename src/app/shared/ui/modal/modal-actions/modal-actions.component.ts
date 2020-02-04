import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-modal-actions',
  styleUrls: ['./modal-actions.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class UIModalActionsComponent { }
