import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ViewportService } from '@app/services/viewport.service';
import { ModalAutoCompleteComponent } from './modal-autocomplete/modal-autocomplete.component';

@Directive({
  selector: '[appModalInput]'
})
export class ModalInputDirective implements OnInit, OnDestroy {
  @Input() modalAutocomplete: ModalAutoCompleteComponent;
  unsubscribe$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    if (this.modalAutocomplete) {
      const input = this.el.nativeElement as HTMLInputElement;

      fromEvent(input, 'click')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((e: MouseEvent) => {
          e.stopPropagation();
          this.modalAutocomplete.open = true;
        });

      fromEvent(document, 'click')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.modalAutocomplete.open = false);

      this.positionAutocomplete(input);
      this.viewport.width$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(this.positionAutocomplete.bind(this, input));
    }
  }

  positionAutocomplete(element: HTMLElement) {
    this.modalAutocomplete.top   = `${element.offsetTop + element.offsetHeight}px`;
    this.modalAutocomplete.left  = `${element.offsetLeft}px`;
    this.modalAutocomplete.width = `${element.offsetWidth}px`;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
