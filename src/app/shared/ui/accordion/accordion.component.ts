import { Component, QueryList, ContentChildren, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UIPanelComponent } from './panel/panel.component';

@Component({
  selector: 'ui-accordion',
  template: '<ng-content></ng-content>'
})
export class UIAccordionComponent implements AfterContentInit {
  @ContentChildren(UIPanelComponent) panels: QueryList<UIPanelComponent>;
  subscriptions: Subscription;

  ngAfterContentInit() {
    this._trackPanels();

    this.panels.changes
      .subscribe(this._trackPanels.bind(this));
  }

  private _trackPanels() {
    if (this.subscriptions) { this.subscriptions.unsubscribe(); }
    this.subscriptions = new Subscription();

    this.panels.forEach(this._handlePanel.bind(this));
  }

  private _handlePanel(panel: UIPanelComponent, index: number) {
    this.subscriptions.add(
      panel.opened
        .subscribe(() => this._closeAllExcept(index))
    );
  }

  private _closeAllExcept(index: number) {
    this.panels.forEach((panel, i) => {
      if (index !== i) {
        panel.open = false;
        panel.title.open = false;
      }
    });
  }
}
