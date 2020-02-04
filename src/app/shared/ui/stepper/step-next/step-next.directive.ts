import { Directive, HostListener } from '@angular/core';

import { StepService } from '../step/step.service';

@Directive({
  selector: '[uiStepNext]'
})
export class UIStepNextDirective {
  constructor(private step: StepService) { }

  @HostListener('click', ['$event']) click(e: Event) {
    e.preventDefault();

    this.step.next();
  }
}
