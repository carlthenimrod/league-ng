import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleService } from './schedule.service';
import { ScheduleComponent } from './schedule.component';
import { ScheduleGroupComponent } from './schedule-group/schedule-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleGroupComponent
  ],
  exports: [
    ScheduleComponent
  ],
  providers: [
    ScheduleService
  ]
})
export class ScheduleModule { }
