import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarMonthComponent,
    CalendarDayComponent,
    CalendarWeekComponent
  ],
  imports: [CommonModule],
  exports: [CalendarComponent],
  providers: [CalendarService],
  entryComponents: [
    CalendarMonthComponent,
    CalendarWeekComponent,
    CalendarDayComponent
  ]
})
export class CalendarModule { }
