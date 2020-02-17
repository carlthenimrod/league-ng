import { Component, ContentChildren, QueryList, HostBinding, ViewEncapsulation, AfterContentChecked, EventEmitter, Output } from '@angular/core';

import { UIOptionComponent } from '../select/option/option.component';

@Component({
  selector: 'ui-auto-complete',
  styleUrls: ['./auto-complete.component.scss'],
  templateUrl: './auto-complete.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UIAutoCompleteComponent implements AfterContentChecked {
  @ContentChildren(UIOptionComponent) options: QueryList<UIOptionComponent>;
  @HostBinding('style.top') top;
  @HostBinding('style.left') left;
  @HostBinding('style.width') width;
  @Output() autocompleteSelect = new EventEmitter<any>();
  open = false;

  constructor() { }

  ngAfterContentChecked() {
    this.options.forEach(this.handleOption.bind(this));
  }

  handleOption(option: UIOptionComponent) {
    if (option.clicked.observers.length !== 0) { return; }

    option.clicked.subscribe(() => {
      this.autocompleteSelect.emit(option.value);
      this.open = false;
    });
  }
}
