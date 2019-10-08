import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoadingService } from './loading/loading.service';
import { NavService } from './header/nav/nav.service';
import { TemplateService } from '@app/services/template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  loading: boolean;
  navToggle: string;
  unsubscribe$ = new Subject<void>();
  @ViewChild('main', { static: false, read: ElementRef }) main: ElementRef;
  @HostListener('touchmove', ['$event']) stopScroll($event) {
    if (this.navToggle !== 'mobileOpen') { return; }
    $event.preventDefault();
  }

  constructor(
    private loadingService: LoadingService,
    private navService: NavService,
    private ref: ChangeDetectorRef,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.navService.$navStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.ref.detectChanges();
      });

    this.loadingService.loading$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit() {
    this.templateService.setContainer(this.main);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
