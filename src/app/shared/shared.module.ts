import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DragDropModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
  ],
  declarations: []
})
export class SharedModule { }
