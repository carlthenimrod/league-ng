import { Component, Input, Output, EventEmitter, HostListener, Host, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-option',
  styleUrls: ['./option.component.scss'],
  templateUrl: './option.component.html'
})
export class UIOptionComponent {
  @Input() value: string;
  @Output() clicked = new EventEmitter<boolean>();
  @HostBinding('class.selected') selectedClass;
  _selected: boolean;
  set selected(value: boolean) {
    this.selectedClass = value;
    this._selected = value;
  }
  get selected() {
    return this._selected;
  }
  multi: boolean;

  constructor() { }

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    e.stopPropagation();

    this.clicked.emit(true);
  }
}
