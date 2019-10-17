import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LeagueService } from '@app/services/league.service';
import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-leagues',
  templateUrl: './admin-leagues.component.html',
  styleUrls: ['./admin-leagues.component.scss']
})
export class AdminLeaguesComponent implements OnInit {
  leagues$: Observable<League[]>;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagues$ = this.leagueService.get$();
  }
}
