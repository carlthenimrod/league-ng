import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-league-details',
  templateUrl: './admin-league-details.component.html',
  styleUrls: ['./admin-league-details.component.scss']
})
export class AdminLeagueDetailsComponent implements OnInit {

  @Input() league: League;
  @Output('editClick') editClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.emit(true);
  }
}
