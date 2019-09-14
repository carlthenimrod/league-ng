import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';

@Component({
  selector: 'app-admin-league',
  templateUrl: './admin-league.component.html',
  styleUrls: ['./admin-league.component.scss']
})
export class AdminLeagueComponent implements OnInit, OnDestroy {
  league: League;
  editingLeague = false;
  tab = 'overview';
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.leagueService.get(params.get('id'))),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(league => this.league = league);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
