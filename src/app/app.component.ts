import { Component, OnInit, HostListener } from '@angular/core';

import { ConfigService } from './services/config.service';
import { LeagueService } from './services/league.service';
import { League } from './models/league';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  leagues: League[];
  showMobile = false;

  constructor(
    private configService: ConfigService,
    private leagueService: LeagueService
  ) {}

  ngOnInit() {
    this.configService.get();

    this.leagueService.all().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    });
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.showMobile = false;
  }
}
