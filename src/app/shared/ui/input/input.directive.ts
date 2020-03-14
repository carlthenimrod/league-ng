import { Directive, Input, HostBinding, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ControlDirective } from '../form-field/control.directive';
import { ViewportService } from '@app/services/viewport.service';
import { UIAutoCompleteComponent } from '../auto-complete/auto-complete.component';

@Directive({
  selector: '[uiInput]',
  providers: [{ provide: ControlDirective, useExisting: UIInputDirective }]
})
export class UIInputDirective implements ControlDirective, OnInit, OnDestroy {
  @Input() autoComplete: UIAutoCompleteComponent;
  @HostBinding() @Input() placeholder: string;
  autofilled = false;
  focused = false;
  unsubscribe$ = new Subject<void>();

  @HostBinding() @Input()
  get required () { return this._required; }
  set required (value: boolean) { this._required = (value != null && `${value}` !== 'false'); }
  private _required: boolean;

  get empty () {
    return !(this.el.nativeElement as HTMLInputElement).value;
  }

  constructor(
    public el: ElementRef,
    public ngControl: NgControl,
    private viewport: ViewportService
  ) { }

  @HostListener('focus') focus() {
    this._focusChanged(true);
  }

  @HostListener('blur') blur() {
    this._focusChanged(false);
  }

  ngOnInit() {
    fromEvent<AnimationEvent>(this.el.nativeElement, 'animationstart')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ animationName }) => this._autofillChanged(animationName));

      if (this.autoComplete) {
        const input = this.el.nativeElement as HTMLInputElement;

        fromEvent(input, 'click')
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((e: MouseEvent) => {
            e.stopPropagation();
            this.autoComplete.open = true;
          });

        fromEvent(document, 'click')
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.autoComplete.open = false);

        this._positionAutocomplete(input);
        this.viewport.width$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(this._positionAutocomplete.bind(this, input));
      }
  }

  private _focusChanged(isFocused: boolean) {
    this.focused = isFocused;
  }

  private _autofillChanged(animationName: string) {
    switch (animationName) {
      case 'autofill-start':
        this.autofilled = true;
        break;
      case 'autofill-cancel':
        this.autofilled = false;
        break;
    }
  }

  private _positionAutocomplete(element: HTMLElement) {
    this.autoComplete.top   = `${element.offsetTop + element.offsetHeight}px`;
    this.autoComplete.left  = `${element.offsetLeft}px`;
    this.autoComplete.width = `${element.offsetWidth}px`;
  }

  onContainerClick() {
    if (!this.focused) { (this.el.nativeElement as HTMLElement).focus(); }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
