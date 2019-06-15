import { Component, OnInit, Input, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';

import { Game } from '@app/models/game';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;

  constructor(
    private calendar: CalendarService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.calendar.create(this.vc);
  }
}
