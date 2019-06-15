import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  @Input() date: moment.Moment;
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }
}
