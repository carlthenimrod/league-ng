import { Component, OnInit, Input, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() next: boolean;
  @Input() prev: boolean;
  @Output() changeMonth: EventEmitter<string> = new EventEmitter();
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }

  onClickChangeMonth(value: string) {
    this.changeMonth.emit(value);
  }
}
