import { Directive, HostListener } from '@angular/core';

import { StepService } from '../step/step.service';

@Directive({
  selector: '[uiStepPrev]'
})
export class UIStepPrevDirective {
  constructor(private step: StepService) { }

  @HostListener('click', ['$event']) click(e: Event) {
    e.preventDefault();

    this.step.prev();
  }
}
