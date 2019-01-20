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
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSliderModule
} from '@angular/material';

import { NoticeComponent } from './notice/notice.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    NoticeComponent,
    ProfileImgComponent
  ],
  declarations: [
    NoticeComponent,
    ProfileImgComponent
  ]
})
export class SharedModule { }
