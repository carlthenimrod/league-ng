import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loadingTrigger } from './animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [loadingTrigger]
})
export class LoadingComponent implements OnInit {
  @HostBinding('class.first-load') firstLoad: boolean;
  @HostBinding('@loading') loading;

  constructor(private router: Router) { }

  ngOnInit() {
    this.firstLoad = !this.router.navigated;
  }
}
