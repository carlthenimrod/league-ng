import { Component, ContentChildren, QueryList, AfterContentInit, HostListener, Input, Attribute, ViewEncapsulation, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { ControlDirective } from '../form-field/control.directive';
import { UIOptionComponent } from './option/option.component';

@Component({
  selector: 'ui-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: ControlDirective, useExisting: UISelectComponent }
  ]
})
export class UISelectComponent implements ControlDirective, AfterContentInit, ControlValueAccessor {
  @ContentChildren(UIOptionComponent) options: QueryList<UIOptionComponent>;
  @Input() placeholder: string;
  multi: boolean;
  open = false;
  onChange: (value) => void;
  onTouched: () => void;
  selectedOption: UIOptionComponent;
  selectedOptions: UIOptionComponent[] = [];
  get selected() {
    return !this.multi
      ? this.selectedOption
      : this.selectedOptions;
  }
  set selected(selected: UIOptionComponent | UIOptionComponent[]) {
    let value;
    if (!this.multi) {
      this.selectedOption = selected as UIOptionComponent;
      value = this.selectedOption.value;
    } else {
      this.selectedOptions = selected as UIOptionComponent[];
      value = this.selectedOptions.map(o => o.value);
    }
    if (this.onChange) { this.onChange(value); }
  }

  get displayText(): string {
    return !this.multi
      ? this.selectedOption.label
      : this.selectedOptions.map(o => o.label).join(', ');
  }

  @Input()
  get required () { return this._required; }
  set required (value: boolean) { this._required = (value != null && `${value}` !== 'false'); }
  private _required: boolean;

  get focused() {
    return this.open;
  }

  get empty() {
    return !this.multi
      ? !this.selectedOption
      : this.selectedOptions.length === 0;
  }

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    @Attribute('multiple') multiple
  ) {
    this.multi = multiple !== null
      ? true
      : false;

    if (this.ngControl) { this.ngControl.valueAccessor = this; }
  }

  writeValue(value) {
    if (!this.options) { return; }

    if (value === null) {
      this.selected = null;
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

  handleOption(option: UIOptionComponent) {
    option.multi = this.multi;
    option.clicked.subscribe(this.onSelect.bind(this, option));
  }

  onSelect(option: UIOptionComponent) {
    if (!option.value) { return; }

    if (!this.multi) {
      this.selected = option;
      this.open = false;
    } else {
      const selected = this.selected as UIOptionComponent[];
      const index = selected.findIndex(s => s === option);
      if (index === -1) {
        this.selected = [...selected, option];
        option.selected = true;
      } else {
        selected.splice(index, 1);
        this.selected = [...selected];
        option.selected = false;
      }
    }
  }

  onContainerClick() {
    if (!this.open) { console.log('open!'); }
  }

  onClickRemove(e: MouseEvent, option: UIOptionComponent) {
    e.stopPropagation();
    this.onTouched();

    if (this.open) {
      this.open = false;
      return;
    }

    const selected = this.selected as UIOptionComponent[];
    const index = selected.findIndex(s => s === option);
    if (index !== -1) {
      selected.splice(index, 1);
      this.selected = [...selected];

      this.options.forEach(o => {
        if (o === option) { option.selected = false; }
      });
    }
  }
}
