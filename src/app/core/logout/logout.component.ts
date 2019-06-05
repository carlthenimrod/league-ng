import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
