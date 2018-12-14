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

import { NotificationComponent } from './notification/notification.component';

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
    NotificationComponent
  ],
  declarations: [NotificationComponent]
})
export class SharedModule { }
