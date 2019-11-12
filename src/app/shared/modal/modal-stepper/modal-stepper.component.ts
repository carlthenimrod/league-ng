import { Component, QueryList, ContentChildren, AfterContentInit, ContentChild, ViewEncapsulation } from '@angular/core';

import { ModalStepComponent } from './modal-step/modal-step.component';
import { ModalStepperHeaderComponent } from './modal-stepper-header/modal-stepper-header.component';

@Component({
  selector: 'app-modal-stepper',
  templateUrl: './modal-stepper.component.html',
  styleUrls: ['./modal-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalStepperComponent implements AfterContentInit {
  @ContentChild(ModalStepperHeaderComponent, { static: false }) header: ModalStepperHeaderComponent;
  @ContentChildren(ModalStepComponent, { descendants: true }) steps: QueryList<ModalStepComponent>;
  active = 1;
  total: number;

  constructor() { }

  ngAfterContentInit() {
    this.total = this.steps.length;
    this.updateHeader();

    this.steps.forEach((step, index) => {
      this.updateState(step, index);

      step.prev.subscribe(this.decrementStep.bind(this, index + 1));
      step.next.subscribe(this.incrementStep.bind(this, index + 1));
    });
  }

  decrementStep(currentStep: number) {
    this.active = currentStep - 1;

    this.updateHeader();
    this.steps.forEach(this.updateState.bind(this));
  }

  incrementStep(currentStep: number) {
    if (currentStep === this.total) { return; }
    this.active = currentStep + 1;

    this.updateHeader();
    this.steps.forEach(this.updateState.bind(this));
  }

  updateHeader() {
    if (!this.header) { return; }
    this.header.step = this.active;
    this.header.stepTotal = this.total;
  }

  updateState(step: ModalStepComponent, index: number) {
    const el = step.el.nativeElement as HTMLElement;
    const currentStep = index + 1;

    if (currentStep === this.active) {
      step.state = 'active';
      this.focus(el);
    } else if (currentStep === (this.active - 1)) {
      step.state = 'prev';
      this.blur(el);
    } else if (currentStep === (this.active + 1)) {
      step.state = 'next';
      this.blur(el);
    } else {
      this.blur(el);
    }
  }

  focus(el: HTMLElement) {
    const input = el.querySelector('input');

    if (!input || input.classList.contains('ng-dirty')) { return; }
    setTimeout(() => input.focus(), 200);
  }

  blur(el: HTMLElement) {
    const inputs = el.querySelectorAll('input');

    if (inputs.length === 0) { return; }
    setTimeout(() => inputs.forEach(i => i.blur()));
  }
}
