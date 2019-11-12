import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalCloseDirective } from './modal-close.directive';
import { ModalService } from './modal.service';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFormFieldComponent } from './modal-form-field/modal-form-field.component';
import { ModalActionsComponent } from './modal-actions/modal-actions.component';
import { ModalStepperComponent } from './modal-stepper/modal-stepper.component';
import { ModalStepperHeaderComponent } from './modal-stepper/modal-stepper-header/modal-stepper-header.component';
import { ModalStepComponent } from './modal-stepper/modal-step/modal-step.component';
import { ModalStepPrevDirective } from './modal-stepper/modal-step/modal-step-prev.directive';
import { ModalStepNextDirective } from './modal-stepper/modal-step/modal-step-next.directive';
import { ModalTogglerComponent } from './modal-toggler/modal-toggler.component';
import { ModalToggleComponent } from './modal-toggler/modal-toggle/modal-toggle.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalCloseDirective,
    ModalHeaderComponent,
    ModalFormFieldComponent,
    ModalActionsComponent,
    ModalStepperComponent,
    ModalStepperHeaderComponent,
    ModalStepComponent,
    ModalStepPrevDirective,
    ModalStepNextDirective,
    ModalTogglerComponent,
    ModalToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalCloseDirective,
    ModalHeaderComponent,
    ModalFormFieldComponent,
    ModalActionsComponent,
    ModalStepperComponent,
    ModalStepperHeaderComponent,
    ModalStepComponent,
    ModalStepPrevDirective,
    ModalStepNextDirective,
    ModalTogglerComponent,
    ModalToggleComponent
  ],
  providers: [ModalService],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
