import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavService } from './header/nav/nav.service';
import { navToggleTrigger, headerToggleTrigger } from './animations';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: [navToggleTrigger, headerToggleTrigger]
})
export class TemplateComponent implements OnInit, OnDestroy {
  navSub: Subscription;
  @HostBinding('@navToggle') navToggle: string;
  @HostListener('touchmove', ['$event']) stopScroll($event) {
    if (this.navToggle === 'desktop') { return; }
    $event.preventDefault();
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

  ngOnDestroy() {
    this.navSub.unsubscribe();
  }
}
