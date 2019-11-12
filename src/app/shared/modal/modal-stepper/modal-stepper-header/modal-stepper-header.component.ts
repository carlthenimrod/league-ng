import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-modal-stepper-header',
  templateUrl: './modal-stepper-header.component.html',
  styleUrls: ['./modal-stepper-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalStepperHeaderComponent {
  @Input() step: number;
  @Input() stepTotal: number;

  constructor() { }
}
