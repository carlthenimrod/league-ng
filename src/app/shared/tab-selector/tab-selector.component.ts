import {
  Component, ContentChild, ElementRef, AfterContentInit, QueryList, ContentChildren,
  OnDestroy, Renderer2, AfterViewInit, Input, ViewChild, ViewChildren, Output, EventEmitter
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

import { ViewportService } from '@app/services/viewport.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tab-selector',
  templateUrl: './tab-selector.component.html',
  styleUrls: ['./tab-selector.component.scss']
})
export class TabSelectorComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input() tabs: string[];
  @Output() select = new EventEmitter<string>();
  @ContentChild('selector', { static: false }) selectorContent: ElementRef;
  @ContentChildren('tab') tabListContent: QueryList<ElementRef>;
  @ViewChild('selector', { static: false }) selectorView: ElementRef;
  @ViewChildren('tab') tabListView: QueryList<ElementRef>;
  selector: HTMLElement;
  selectedIndex = 0;
  tabList: HTMLElement[];
  unsubscribe$ = new Subject<void>();

  constructor(
    private renderer: Renderer2,
    private viewport: ViewportService
  ) { }

  ngAfterContentInit() {
    this.selector = this.selectorContent && this.selectorContent.nativeElement as HTMLElement;
    this.tabList = this.tabListContent.length && this.tabListContent.toArray().map(el => el.nativeElement as HTMLElement);
  }

  ngAfterViewInit() {
    this.selector = this.selector ||
      (this.selectorView && this.selectorView.nativeElement as HTMLElement);

    this.tabList = this.tabList ||
      (this.tabListView.length && this.tabListView.toArray().map(el => el.nativeElement as HTMLElement));

    this.viewport.width$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.move.bind(this));

    this.tabList.forEach((el, index) =>
      fromEvent(el, 'click')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.slide(el, index))
    );
  }

  slide(el: HTMLElement, index: number) {
    this.selectedIndex = index;

    this.renderer.setStyle(this.selector, 'left', `${el.offsetLeft}px`);
    this.renderer.setStyle(this.selector, 'width', `${el.offsetWidth}px`);
  }

  move() {
    const el = this.tabList[this.selectedIndex];

    this.renderer.setStyle(this.selector, 'transition', 'none');
    this.renderer.setStyle(this.selector, 'left', `${el.offsetLeft}px`);
    this.renderer.setStyle(this.selector, 'width', `${el.offsetWidth}px`);
    this.renderer.removeStyle(this.selector, 'transition');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
