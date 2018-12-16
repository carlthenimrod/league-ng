import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';

import { NoticeComponent } from './notice/notice.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    NoticeComponent
  ],
  declarations: [NoticeComponent]
})
export class SharedModule { }
