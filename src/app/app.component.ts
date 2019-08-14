import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { SocketService } from './services/socket.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private location: Location,
    private socketService: SocketService
  ) {}

  @HostListener('touchmove', ['$event']) test($event) {
    $event.preventDefault();
  }

  ngOnInit() {
    const path = this.location.path();

    if ( (path !== '/logout') && this.authService.loggedIn() ) {
      const auth = this.authService.getAuth();
      this.socketService.connect(auth);
    }
  }
}
