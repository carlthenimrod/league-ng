import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';

import { navMenuTrigger } from './animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [navMenuTrigger]
})
export class NavComponent implements OnInit {
  selected = 'home';
  $path: Observable<string[]>;
  @HostBinding('@navMenu') navMenu;

  constructor() { }

  ngOnInit() {
    this.$path.subscribe(path => {
      if (path.length === 0) {
        this.selected = 'home';
        return;
      }

      switch (path[0]) {
        case 'team':
          this.selected = 'teams';
          break;
        case 'league':
          this.selected = 'leagues';
          break;
        case 'admin':
          this.selected = 'admin';
          break;
        default:
          this.selected = 'home';
      }
    });
  }
}
