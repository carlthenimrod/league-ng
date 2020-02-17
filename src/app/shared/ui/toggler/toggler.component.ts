import { Component, ViewEncapsulation, ContentChildren, QueryList, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UIToggleComponent } from './toggle/toggle.component';

@Component({
  selector: 'ui-toggler',
  styleUrls: ['./toggler.component.scss'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class UITogglerComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(UIToggleComponent) toggles: QueryList<UIToggleComponent>;
  unsubscribe$ = new Subject<void>();

  ngAfterContentInit() {
    this.toggles.first.checked = true;

    this.toggles.forEach(toggle => {
      if (!toggle.el) { return; }

      this.listenChange(toggle.el.nativeElement);
    });
  }

  listenChange(input: HTMLInputElement) {
    fromEvent(input, 'change')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(e => this.updateChecked(e.target as HTMLInputElement));
  }

  updateChecked(target: HTMLInputElement) {
    this.toggles.forEach(toggle => {
      if (!toggle.el) { return; }

      toggle.el.nativeElement === target
        ? toggle.checked = true
        : toggle.checked = false;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
