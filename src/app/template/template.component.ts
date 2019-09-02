import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectorRef, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavService } from './header/nav/nav.service';
import { TemplateService } from '@app/services/template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  navSub: Subscription;
  navToggle: string;
  @ViewChild('main', { static: false, read: ElementRef }) main: ElementRef;
  @HostListener('touchmove', ['$event']) stopScroll($event) {
    if (this.navToggle !== 'mobileOpen') { return; }
    $event.preventDefault();
  }

  constructor(
    private navService: NavService,
    private ref: ChangeDetectorRef,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.navSub = this.navService.$navStatus().subscribe(status => {
      this.ref.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.templateService.setContainer(this.main);
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
  }
}
