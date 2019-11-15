import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';

import { ModalDatePickerComponent } from './modal-date-picker.component';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appModalDatePicker]'
})
export class ModalDatePickerDirective implements OnInit, OnDestroy {
  @Input() appModalDatePicker: ModalDatePickerComponent;
  input: HTMLInputElement;
  unsubscribe$ = new Subject<void>();

  constructor(private el: ElementRef) {
    this.input = this.el.nativeElement;

    fromEvent(this.input, 'click')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => !this.appModalDatePicker.show && this.appModalDatePicker.open());
  }

  ngOnInit() {
    this.appModalDatePicker.selected = this.input.value;

    this.appModalDatePicker.dateClicked
      .subscribe(date => this.input.value = date);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
