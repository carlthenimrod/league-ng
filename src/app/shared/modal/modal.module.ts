import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalCloseDirective } from './modal-close.directive';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [
    ModalComponent,
    ModalCloseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalCloseDirective
  ],
  providers: [ModalService],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
