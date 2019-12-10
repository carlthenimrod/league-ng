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
import { ModalModule } from './modal/modal.module';
import { StringifyAddressPipe } from './stringify-address.pipe';
import { MustMatchValidatorDirective } from './validators/must-match.directive';
import { HasAddressPipe } from './has-address.pipe';
import { NavSlideComponent } from './nav-slide/nav-slide.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    ModalModule
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
    NavSlideComponent,
    TabSelectorComponent,
    ModalModule,
    StringifyAddressPipe,
    HasAddressPipe,
    MustMatchValidatorDirective
  ],
  declarations: [
    NoticeComponent,
    ProfileImgComponent,
    FormatLocationsPipe,
    GameComponent,
    GmapLinkPipe,
    NavSlideComponent,
    TabSelectorComponent,
    StringifyAddressPipe,
    HasAddressPipe,
    MustMatchValidatorDirective
  ]
})
export class SharedModule { }
