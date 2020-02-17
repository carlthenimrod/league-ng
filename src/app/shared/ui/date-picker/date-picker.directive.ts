import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { UIDatePickerComponent } from './date-picker.component';

@Directive({
  selector: '[uiDatePicker]'
})
export class UIDatePickerDirective implements OnInit, OnDestroy {
  @Input() uiDatePicker: UIDatePickerComponent;
  input: HTMLInputElement;
  unsubscribe$ = new Subject<void>();

  constructor(private el: ElementRef) {
    this.input = this.el.nativeElement;

    fromEvent(this.input, 'click')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => !this.uiDatePicker.show && this.uiDatePicker.open());
  }

  ngOnInit() {
    this.uiDatePicker.selected = this.input.value;

    this.uiDatePicker.dateClicked
      .subscribe(date => this.input.value = date);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
