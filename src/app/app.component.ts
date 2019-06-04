import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      const auth = this.authService.getAuth();
      this.socketService.connect(auth);
    }
  }
}
