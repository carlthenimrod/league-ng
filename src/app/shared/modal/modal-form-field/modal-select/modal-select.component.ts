import { Component, ContentChildren, QueryList, AfterContentInit, HostListener, Input, Attribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ModalOptionComponent } from './modal-option/modal-option.component';

@Component({
  selector: 'app-modal-select',
  styleUrls: ['./modal-select.component.scss'],
  templateUrl: './modal-select.component.html',
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
  _selected: string;
  get selected() {
    return !this.multi ? this._selected : this._selectedMulti;
  }
  set selected(value) {
    if (!this.multi && typeof value === 'string') {
      this._selected = value as string;
    } else if (value instanceof Array) {
      this._selectedMulti = value as string[];
    }

    this.onChange(this.selected);
  }

  constructor(@Attribute('multiple') multiple) {
    this.multi = multiple !== null
      ? true
      : false;
  }

  writeValue(value) {
    if (value === null) { return; }

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
      const index = ((this.selected as string[]) as string[]).findIndex(v => v === option.value);
      if (index === -1) {
        (this.selected as string[]).push(option.value);
        option.selected = true;
      } else {
        (this.selected as string[]).splice(index, 1);
        option.selected = false;
      }
    }
  }

  onClickRemove(e: MouseEvent, value: string) {
    e.stopPropagation();

    if (this.open) {
      this.open = false;
      return;
    }

    const index = (this.selected as string[]).findIndex(v => v === value);
    if (index !== -1) {
      (this.selected as string[]).splice(index, 1);

      this.options.forEach(option => {
        if (option.value === value) { option.selected = false; }
      });
    }
  }
}
