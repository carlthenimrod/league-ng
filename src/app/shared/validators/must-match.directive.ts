import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMustMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchValidatorDirective, multi: true }]
})
export class MustMatchValidatorDirective implements Validator {
  @Input('appMustMatch') match: string;

  validate(control: AbstractControl): ValidationErrors {
    return !this.match || !control.value || this.match.toLowerCase().trim() !== control.value.toLowerCase().trim() ? { 'noMatch': true } : null;
  }
}
