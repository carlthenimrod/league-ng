import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIFormFieldComponent } from './form-field/form-field.component';
import { UIInputDirective } from './input/input.directive';
import { UIErrorComponent } from './form-field/error/error.component';
import { UIHintComponent } from './form-field/hint/hint.component';
import { UISelectComponent } from './select/select.component';
import { UIOptionComponent } from './select/option/option.component';
import { UIStepperComponent } from './stepper/stepper.component';
import { UIStepComponent } from './stepper/step/step.component';
import { UIStepPrevDirective } from './stepper/step-prev/step-prev.directive';
import { UIStepNextDirective } from './stepper/step-next/step-next.directive';
import { UIAccordionComponent } from './accordion/accordion.component';
import { UIPanelComponent } from './accordion/panel/panel.component';
import { UIPanelTitleComponent } from './accordion/panel/panel-title/panel-title.component';
import { UIPanelContentComponent } from './accordion/panel/panel-content/panel-content.component';
import { UIModalComponent } from './modal/modal.component';
import { UIModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { UIModalActionsComponent } from './modal/modal-actions/modal-actions.component';
import { UIModalCloseDirective } from './modal/modal-close/modal-close.directive';
import { UIModalService } from './modal/modal.service';
import { UIModalFormFieldComponent } from './modal/modal-form-field/modal-form-field.component';
import { UIModalSelectComponent } from './modal/modal-select/modal-select.component';

@NgModule({
  declarations: [
    UIFormFieldComponent,
    UIInputDirective,
    UIErrorComponent,
    UIHintComponent,
    UISelectComponent,
    UIOptionComponent,
    UIStepperComponent,
    UIStepComponent,
    UIStepPrevDirective,
    UIStepNextDirective,
    UIAccordionComponent,
    UIPanelComponent,
    UIPanelTitleComponent,
    UIPanelContentComponent,
    UIModalComponent,
    UIModalHeaderComponent,
    UIModalActionsComponent,
    UIModalCloseDirective,
    UIModalFormFieldComponent,
    UIModalSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UIFormFieldComponent,
    UIInputDirective,
    UIErrorComponent,
    UIHintComponent,
    UISelectComponent,
    UIOptionComponent,
    UIStepperComponent,
    UIStepComponent,
    UIStepPrevDirective,
    UIStepNextDirective,
    UIAccordionComponent,
    UIPanelComponent,
    UIPanelTitleComponent,
    UIPanelContentComponent,
    UIModalComponent,
    UIModalHeaderComponent,
    UIModalActionsComponent,
    UIModalCloseDirective,
    UIModalFormFieldComponent,
    UIModalSelectComponent
  ],
  providers: [
    UIModalService
  ],
  entryComponents: [
    UIModalComponent
  ]
})
export class UIModule { }
