import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';

@Component({
  selector: 'app-admin-league-list',
  templateUrl: './admin-league-list.component.html',
  styleUrls: ['./admin-league-list.component.scss']
})
export class AdminLeagueListComponent implements OnInit {
  leagues$: Observable<League[]>;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagues$ = this.leagueService.get$();
  }
}
