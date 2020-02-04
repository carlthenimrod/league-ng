import { Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, OnDestroy, HostBinding } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { StepService } from './step.service';
import { transitionTrigger } from './animations';

@Component({
  selector: 'ui-step',
  styleUrls: ['step.component.scss'],
  template: '<ng-content></ng-content>',
  providers: [StepService],
  animations: [transitionTrigger]
})
export class UIStepComponent implements AfterContentInit, OnDestroy {
  @Input() stepControl: AbstractControl;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @HostBinding('@transition') @Input() state;
  unsubscribe$ = new Subject<void>();

  constructor(
    public el: ElementRef,
    private step: StepService
  ) { }

  ngAfterContentInit() {
    this.step.prev$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.prev.emit());

    this.step.next$
      .pipe(
        filter(() => !this.stepControl || this.stepControl.valid),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.next.emit());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
