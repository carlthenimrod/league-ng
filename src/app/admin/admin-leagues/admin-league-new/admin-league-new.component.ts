import { Component, OnInit } from '@angular/core';
import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-league-new',
  templateUrl: './admin-league-new.component.html',
  styleUrls: ['./admin-league-new.component.scss']
})
export class AdminLeagueNewComponent implements OnInit {

  league: League;

  constructor() { }

  ngOnInit() {
    this.league = new League('');
  }
}
