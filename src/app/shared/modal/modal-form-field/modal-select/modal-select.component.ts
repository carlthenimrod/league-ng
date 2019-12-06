import { Component, ContentChildren, QueryList, AfterContentInit, HostListener, Input, Attribute, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ModalOptionComponent } from './modal-option/modal-option.component';

@Component({
  selector: 'app-modal-select',
  styleUrls: ['./modal-select.component.scss'],
  templateUrl: './modal-select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModalSelectComponent),
      multi: true
    }
  ]
})
export class ModalSelectComponent implements AfterContentInit, ControlValueAccessor {
  @ContentChildren(ModalOptionComponent) options: QueryList<ModalOptionComponent>;
  @Input() placeholder: string;
  multi: boolean;
  open = false;
  onChange: (value) => void;
  onTouched: () => void;
  _selectedMulti: string[] = [];
  _selected = '';
  get selected() {
    return !this.multi ? this._selected : this._selectedMulti;
  }
  set selected(value) {
    if (!this.multi && typeof value === 'string') {
      this._selected = value as string;
    } else if (value instanceof Array) {
      this._selectedMulti = value as string[];
    } else {
      this._selectedMulti = [];
    }
    if (this.onChange) { this.onChange(value); }
  }

  constructor(@Attribute('multiple') multiple) {
    this.multi = multiple !== null
      ? true
      : false;
  }

  writeValue(value) {
    if (value === null) {
      this.selected = '';
      this.options.forEach(option => option.selected = false);
    }

    this.selected = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    e.stopPropagation();

    this.onTouched();
    this.open = !this.open;
  }

  @HostListener('document:click') onDocumentClick() {
    this.open = false;
  }

  ngAfterContentInit() {
    this.options.forEach(this.handleOption.bind(this));
  }

  handleOption(option: ModalOptionComponent) {
    option.multi = this.multi;
    option.clicked.subscribe(this.onSelect.bind(this, option));
  }

  onSelect(option: ModalOptionComponent) {
    if (!option.value) { return; }

    if (!this.multi) {
      (this.selected as string) = option.value;
      this.open = false;
    } else {
      const selected = this.selected as string[];
      const index = selected.findIndex(v => v === option.value);
      if (index === -1) {
        this.selected = [...selected, option.value];
        option.selected = true;
      } else {
        selected.splice(index, 1);
        this.selected = [...selected];
        option.selected = false;
      }
    }
  }

  onClickRemove(e: MouseEvent, value: string) {
    e.stopPropagation();
    this.onTouched();

    if (this.open) {
      this.open = false;
      return;
    }

    const selected = this.selected as string[];
    const index = selected.findIndex(v => v === value);
    if (index !== -1) {
      selected.splice(index, 1);
      this.selected = [...selected];

      this.options.forEach(option => {
        if (option.value === value) { option.selected = false; }
      });
    }
  }
}
