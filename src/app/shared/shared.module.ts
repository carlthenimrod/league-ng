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
import { TabSelectorComponent } from './tab-selector/tab-selector.component';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    DialogModule
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
    GameComponent,
    TabSelectorComponent,
    DialogModule
  ],
  declarations: [
    NoticeComponent,
    ProfileImgComponent,
    FormatLocationsPipe,
    GameComponent,
    GmapLinkPipe,
    TabSelectorComponent
  ]
})
export class SharedModule { }
