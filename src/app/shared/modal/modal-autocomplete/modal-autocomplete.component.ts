import { Component, ContentChildren, QueryList, HostBinding, ViewEncapsulation, AfterContentChecked, EventEmitter, Output } from '@angular/core';

import { ModalOptionComponent } from '../modal-form-field/modal-select/modal-option/modal-option.component';

@Component({
  selector: 'app-modal-autocomplete',
  styleUrls: ['./modal-autocomplete.component.scss'],
  templateUrl: './modal-autocomplete.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ModalAutoCompleteComponent implements AfterContentChecked {
  @ContentChildren(ModalOptionComponent) options: QueryList<ModalOptionComponent>;
  @HostBinding('style.top') top;
  @HostBinding('style.left') left;
  @HostBinding('style.width') width;
  @Output() autocompleteSelect = new EventEmitter<any>();
  open = false;

  constructor() { }

  ngAfterContentChecked() {
    this.options.forEach(this.handleOption.bind(this));
  }

  handleOption(option: ModalOptionComponent) {
    if (option.clicked.observers.length !== 0) { return; }

    option.clicked.subscribe(() => {
      this.autocompleteSelect.emit(option.value);
      this.open = false;
    });
  }
}
