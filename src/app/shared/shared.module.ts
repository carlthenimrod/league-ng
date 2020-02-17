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
import { ScheduleModule } from './schedule/schedule.module';
import { StringifyAddressPipe } from './stringify-address.pipe';
import { MustMatchValidatorDirective } from './validators/must-match.directive';
import { HasAddressPipe } from './has-address.pipe';
import { NavSlideComponent } from './nav-slide/nav-slide.component';
import { UIModule } from './ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    ScheduleModule,
    UIModule
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
    ScheduleModule,
    StringifyAddressPipe,
    HasAddressPipe,
    MustMatchValidatorDirective,
    UIModule
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
