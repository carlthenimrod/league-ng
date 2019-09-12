import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { Auth, AuthResponse } from './models/auth';
import { SocketService } from './services/socket.service';

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

  ngOnInit() {
    const path = this.location.path();

    this.authService.loggedIn$()
      .pipe(take(1))
      .subscribe(loggedIn => {
        if (!loggedIn || (path === '/logout')) { return; }

        const auth = this.authService.getAuth();
        this.socketService.connect(auth).then((authResponse: AuthResponse) => {
          const updatedAuth: Auth = this.authService.formatResponse(authResponse);
          this.authService.setLocalStorage(updatedAuth);
        });
      });
  }
}
