import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';

@Component({
  selector: 'app-admin-league',
  templateUrl: './admin-league.component.html',
  styleUrls: ['./admin-league.component.scss']
})
export class AdminLeagueComponent implements OnInit {
  league$: Observable<League>;
  editingLeague = false;
  selected = 'overview';

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.league$ = this.route.paramMap
      .pipe(
        switchMap(params => this.leagueService.get$(params.get('id'))),
        switchMap(() => this.leagueService.league$)
      );
  }

  onSelect(selected: string) {
    this.selected = selected;
  }
}
