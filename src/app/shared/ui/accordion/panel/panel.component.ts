import { Component, ContentChild, AfterContentInit, Output, EventEmitter } from '@angular/core';

import { UIPanelTitleComponent } from './panel-title/panel-title.component';
import { UIPanelContentComponent } from './panel-content/panel-content.component';

@Component({
  selector: 'ui-panel',
  templateUrl: './panel.component.html'
})
export class UIPanelComponent implements AfterContentInit {
  @ContentChild(UIPanelTitleComponent, { static: false }) title: UIPanelTitleComponent;
  @ContentChild(UIPanelContentComponent, { static: false }) content: UIPanelContentComponent;
  @Output() opened = new EventEmitter<void>();
  open = false;

  constructor() { }

  ngAfterContentInit() {
    this.title.clicked
      .subscribe(() => {
        this.open = !this.open;
        this.title.open = this.open;

        if (this.open) { this.opened.emit(); }
      });
  }
}
