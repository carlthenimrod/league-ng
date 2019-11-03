import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog.component';
import { DialogCloseDirective } from './dialog-close.directive';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [
    DialogComponent,
    DialogCloseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DialogCloseDirective
  ],
  providers: [DialogService],
  entryComponents: [DialogComponent]
})
export class DialogModule { }
