import { Component, OnInit } from '@angular/core';

import { ConfigService } from './services/config.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private configService: ConfigService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.configService.get();
    this.socketService.connect();
  }
}
