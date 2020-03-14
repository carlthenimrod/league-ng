import { Component, Input, Output, EventEmitter, HostListener, Host, HostBinding, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-option',
  styleUrls: ['./option.component.scss'],
  templateUrl: './option.component.html'
})
export class UIOptionComponent {
  @Input() value: string;
  @Output() clicked = new EventEmitter<boolean>();
  @HostBinding('class.selected') selectedClass;

  private _selected: boolean;
  set selected(value: boolean) {
    this.selectedClass = value;
    this._selected = value;
  }
  get selected() {
    return this._selected;
  }

  @ViewChild('label') private _label: ElementRef;
  get label() {
    return this._label
      ? (this._label.nativeElement as HTMLElement).innerHTML
      : null;
  }

  multi: boolean;

  constructor() { }

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    e.stopPropagation();

    this.clicked.emit(true);
  }
}
