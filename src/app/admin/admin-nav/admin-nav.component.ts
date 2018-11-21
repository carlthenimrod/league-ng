import { Component, OnInit } from '@angular/core';

import { slideNavTrigger } from './animations';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  animations: [slideNavTrigger]
})
export class AdminNavComponent implements OnInit {

  menu = 'closed';

  constructor() { }

  ngOnInit() {
  }

  onMenuClick() {
    if (this.menu === 'closed') {
      this.menu = 'open';
    } else {
      this.menu = 'closed';
    }
  }

  onCloseClick() {
    this.menu = 'closed';
  }
}
