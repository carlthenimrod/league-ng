import { Directive, Input, HostBinding, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[uiInput]'
})
export class UIInputDirective implements OnInit, OnDestroy {
  @HostBinding() @Input() placeholder: string;
  autofilled = false;
  focused = false;
  unsubscribe$ = new Subject<void>();

  @HostBinding() @Input()
  get required () { return this._required; }
  set required (value: boolean) { this._required = (value != null && `${value}` !== 'false'); }
  private _required: boolean;

  get empty () {
    return !!(this.el.nativeElement as HTMLInputElement).value;
  }

  constructor(
    public el: ElementRef,
    public ngControl: NgControl
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
