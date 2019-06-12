import { Component, OnInit, Input } from '@angular/core';
import { Game } from '@app/models/game';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() games: Game[];

  constructor() { }

  ngOnInit() {
  }

}
