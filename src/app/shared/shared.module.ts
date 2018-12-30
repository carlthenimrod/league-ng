import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { NoticeComponent } from './notice/notice.component';

@NgModule({
  imports: [
    CommonModule,
    MatNativeDateModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    NoticeComponent
  ],
  declarations: [NoticeComponent]
})
export class SharedModule { }
