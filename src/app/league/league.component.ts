import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { League } from '@app/models/league';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  tab = 'schedule';
  league: League;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { league: League }) => {
      console.log(data);
      this.league = data.league;
    });
  }
}
