import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { SocketService } from './services/socket.service';
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
    private authService: AuthService,
    private leagueService: LeagueService,
    private location: Location,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    const path = this.location.path();

    this.leagueService.all().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    });

    if ( (path !== '/logout') && this.authService.loggedIn() ) {
      const auth = this.authService.getAuth();
      this.socketService.connect(auth);
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.showMobile = false;
  }
}
