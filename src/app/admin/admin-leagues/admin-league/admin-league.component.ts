import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-league',
  templateUrl: './admin-league.component.html',
  styleUrls: ['./admin-league.component.scss']
})
export class AdminLeagueComponent implements OnInit {

  league: League;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.leagueService.get(params.get('id')))
    )
    .subscribe((league: League) => this.league = league);
  }

}
