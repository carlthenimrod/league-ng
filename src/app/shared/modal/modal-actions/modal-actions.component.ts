import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-actions',
  template: '<ng-content></ng-content>',
  styleUrls: ['./modal-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalActionsComponent { }
