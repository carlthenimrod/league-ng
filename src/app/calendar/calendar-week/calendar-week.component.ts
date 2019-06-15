import { Component, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;

  constructor() { }
}
