import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavService } from './header/nav/nav.service';
import { navToggleTrigger } from './animations';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: [navToggleTrigger]
})
export class TemplateComponent implements OnInit, OnDestroy {
  navSub: Subscription;
  navToggle: string;
  @HostBinding('@navToggle') get navToggleTrigger () {
    return this.navToggle;
  }
  @HostListener('touchmove', ['$event']) stopScroll($event) {
    console.log(this.navToggle);
    // if (this.navToggle !== 'mobileOpen') { return; }
    // $event.preventDefault();
  }

  constructor(
    private navService: NavService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.navSub = this.navService.$navStatus().subscribe(status => {
      this.navToggle = status;
      this.ref.detectChanges();
    });
  }


  onScroll() {
    console.log('test');
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
  }
}
