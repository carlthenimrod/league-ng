import { Component, OnInit } from '@angular/core';

import { LeagueService } from '@app/core/league.service';
import { League } from '@app/models/league';

@Component({
  selector: 'app-admin-leagues',
  templateUrl: './admin-leagues.component.html',
  styleUrls: ['./admin-leagues.component.scss']
})
export class AdminLeaguesComponent implements OnInit {
  leagues: League[];

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagueService.all().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    });
  }
}
