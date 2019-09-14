import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';

@Component({
  selector: 'app-admin-league',
  templateUrl: './admin-league.component.html',
  styleUrls: ['./admin-league.component.scss']
})
export class AdminLeagueComponent implements OnInit, OnDestroy {
  league: League;
  leagueSubscription: Subscription;
  editingLeague = false;
  tab = 'overview';

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.leagueSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.leagueService.get(params.get('id'));
        return this.leagueService.league$();
      })
    )
    .subscribe((league: League) => this.league = league);
  }

  ngOnDestroy() {
    this.leagueSubscription.unsubscribe();
  }
}
