import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { League } from '@app/models/league';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  selected = 'home';
  league: League;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { league: League }) => {
      this.league = data.league;
    });
  }

  onNavClick(clicked: string) {
    this.selected = clicked;
  }
}
