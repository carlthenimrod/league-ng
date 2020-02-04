import { Component, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-panel-title',
  styleUrls: ['./panel-title.component.scss'],
  templateUrl: 'panel-title.component.html'
})
export class UIPanelTitleComponent {
  @Output() clicked = new EventEmitter<void>();
  open = false;

  @HostListener('click') onClick() {
    this.clicked.emit();
  }
}
