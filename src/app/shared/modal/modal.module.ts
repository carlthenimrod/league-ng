import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalCloseDirective } from './modal-close.directive';
import { ModalService } from './modal.service';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFormFieldComponent } from './modal-form-field/modal-form-field.component';
import { ModalSelectComponent } from './modal-form-field/modal-select/modal-select.component';
import { ModalOptionComponent } from './modal-form-field/modal-select/modal-option/modal-option.component';
import { ModalActionsComponent } from './modal-actions/modal-actions.component';
import { ModalStepperComponent } from './modal-stepper/modal-stepper.component';
import { ModalStepperHeaderComponent } from './modal-stepper/modal-stepper-header/modal-stepper-header.component';
import { ModalStepperContentComponent } from './modal-stepper/modal-stepper-content/modal-stepper-content.component';
import { ModalStepComponent } from './modal-stepper/modal-step/modal-step.component';
import { ModalStepPrevDirective } from './modal-stepper/modal-step/modal-step-prev.directive';
import { ModalStepNextDirective } from './modal-stepper/modal-step/modal-step-next.directive';
import { ModalTogglerComponent } from './modal-toggler/modal-toggler.component';
import { ModalToggleComponent } from './modal-toggler/modal-toggle/modal-toggle.component';
import { ModalDatePickerComponent } from './modal-date-picker/modal-date-picker.component';
import { ModalDatePickerDirective } from './modal-date-picker/modal-date-picker.directive';

@NgModule({
  declarations: [
    ModalComponent,
    ModalCloseDirective,
    ModalHeaderComponent,
    ModalFormFieldComponent,
    ModalSelectComponent,
    ModalOptionComponent,
    ModalActionsComponent,
    ModalStepperComponent,
    ModalStepperHeaderComponent,
    ModalStepperContentComponent,
    ModalStepComponent,
    ModalStepPrevDirective,
    ModalStepNextDirective,
    ModalTogglerComponent,
    ModalToggleComponent,
    ModalDatePickerComponent,
    ModalDatePickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalCloseDirective,
    ModalHeaderComponent,
    ModalFormFieldComponent,
    ModalSelectComponent,
    ModalOptionComponent,
    ModalActionsComponent,
    ModalStepperComponent,
    ModalStepperHeaderComponent,
    ModalStepperContentComponent,
    ModalStepComponent,
    ModalStepPrevDirective,
    ModalStepNextDirective,
    ModalTogglerComponent,
    ModalToggleComponent,
    ModalDatePickerComponent,
    ModalDatePickerDirective
  ],
  providers: [ModalService],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
