import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive()
export abstract class ControlDirective {
  readonly placeholder: string;

  readonly empty: boolean;

  readonly required: boolean;

  readonly focused: boolean;

  readonly ngControl: NgControl | null;

  readonly autofilled?: boolean;

  abstract onContainerClick(event: MouseEvent): void;
}
