import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { navMenuTrigger } from './animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [navMenuTrigger]
})
export class NavComponent implements OnInit {
  @Input() navStatus: string;

  @HostBinding('@navMenu') get hideNav() {
    return this.navStatus;
  }

  constructor() { }

  ngOnInit() {
  }
}
