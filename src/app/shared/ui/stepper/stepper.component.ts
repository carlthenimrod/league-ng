import { Component, ContentChildren, QueryList, AfterContentInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, ElementRef, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { UIStepperHeaderComponent } from './stepper-header/stepper-header.component';
import { UIStepComponent } from './step/step.component';

@Component({
  selector: 'ui-stepper',
  styleUrls: ['./stepper.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class UIStepperComponent implements AfterContentInit, OnDestroy {
  @ContentChild(UIStepperHeaderComponent, { static: false }) header: UIStepperHeaderComponent;
  @ContentChildren(UIStepComponent, { descendants: true }) steps: QueryList<UIStepComponent>;
  current = 1;
  total: number;
  private _prevClicks: Subscription;
  private _nextClicks: Subscription;

  constructor(private el: ElementRef) { }

  ngAfterContentInit() {
    this._updateSteps();

    this.steps.changes
      .subscribe(() => {
        this._unsubscribe();
        this._updateSteps();
      });
  }

  private _updateSteps() {
    this.total = this.steps.length;

    this._prevClicks = new Subscription();
    this._nextClicks = new Subscription();

    this.steps.forEach((step, i) => {
      this._prevClicks.add(
        step.prev.subscribe(() => this.decrementStep(i + 1))
      );

      this._nextClicks.add(
        step.next.subscribe(() => this.incrementStep(i + 1))
      );

      this._updateHeader();
      setTimeout(() => this._updateState(step, i));
    });
  }

  private _updateHeader() {
    if (!this.header) { return; }
    this.header.step = this.current;
    this.header.stepTotal = this.total;
  }

  decrementStep(currentStep: number) {
    const newValue = currentStep - 1;

    if ((newValue === this.current) || (newValue < 1)) { return; }
    this.current = newValue;

    window.scrollTo(0, 0);

    this._updateHeader();
    this.steps.forEach(this._updateState.bind(this));
  }

  incrementStep(currentStep: number) {
    const newValue = currentStep + 1;

    if ((newValue === this.current) || (newValue > this.total)) { return; }
    this.current = newValue;

    window.scrollTo(0, 0);

    this._updateHeader();
    this.steps.forEach(this._updateState.bind(this));
  }

  private _updateState(step: UIStepComponent, index: number) {
    const el = step.el.nativeElement as HTMLElement;
    const currentStep = index + 1;

    if (currentStep === this.current) {
      step.state = 'active';
      this.focus(el);
    } else if (currentStep === (this.current - 1)) {
      step.state = 'prev';
      this.blur(el);
    } else if (currentStep === (this.current + 1)) {
      step.state = 'next';
      this.blur(el);
    } else {
      step.state = null;
      this.blur(el);
    }
  }

  focus(el: HTMLElement) {
    // const input = el.querySelector('input');

    // if (!input || input.classList.contains('ng-dirty')) { return; }
    // setTimeout(() => input.focus(), 200);
  }

  blur(el: HTMLElement) {
    // const inputs = el.querySelectorAll('input');

    // if (inputs.length === 0) { return; }
    // setTimeout(() => inputs.forEach(i => i.blur()));
  }

  private _unsubscribe() {
    this._prevClicks.unsubscribe();
    this._nextClicks.unsubscribe();
  }

  ngOnDestroy() {
    this._unsubscribe();
  }
}
