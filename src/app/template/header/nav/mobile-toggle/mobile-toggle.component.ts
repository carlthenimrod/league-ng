import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngl-mobile-toggle',
  styles: [`
    button {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 0 0.5rem;
    }
  `],
  template: `
    <button type="button" (click)="onClick($event)">
      <i class="fas fa-bars"></i>
    </button>
  `
})
export class MobileNavToggleComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick(e: MouseEvent) {
    e.preventDefault();

    this.clicked.emit();
  }
}
