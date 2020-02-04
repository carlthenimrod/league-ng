import { Component, HostBinding } from '@angular/core';

import { panelTrigger } from './animations';

@Component({
  selector: 'ui-panel-content',
  template: '<ng-content></ng-content>',
  animations: [panelTrigger]
})
export class UIPanelContentComponent {
  @HostBinding('@panel') panel;

  constructor() { }
}
