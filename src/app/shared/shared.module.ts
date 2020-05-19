import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

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
