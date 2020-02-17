import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'ui-stepper-header',
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UIStepperHeaderComponent {
  @Input() step: number;
  @Input() stepTotal: number;

  constructor() { }
}
