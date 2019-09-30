import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSliderModule
} from '@angular/material';

import { NoticeComponent } from './notice/notice.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { FormatLocationsPipe } from './format-locations.pipe';
import { GameComponent } from './game/game.component';
import { GmapLinkPipe } from './gmap-link.pipe';

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
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    NoticeComponent,
    ProfileImgComponent,
    FormatLocationsPipe,
    GmapLinkPipe,
    GameComponent
  ],
  declarations: [
    NoticeComponent,
    ProfileImgComponent,
    FormatLocationsPipe,
    GameComponent,
    GmapLinkPipe
  ]
})
export class SharedModule { }
