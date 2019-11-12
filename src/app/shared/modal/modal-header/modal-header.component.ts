import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  template: '<ng-content></ng-content>',
  styleUrls: ['./modal-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalHeaderComponent { }
