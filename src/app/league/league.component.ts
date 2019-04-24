import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LeagueService } from '@app/services/league.service';
import { League } from '@app/models/league';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit, OnDestroy {
  tab = 'schedule';
  league: League;
  leagueSubscription: Subscription;

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.leagueSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.leagueService.get(params.get('id'));
        return this.leagueService.leagueListener();
      })
    )
    .subscribe((league: League) => this.league = league);
  }

  ngOnDestroy() {
    this.leagueSubscription.unsubscribe();
  }
}
