import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, Observer, timer, of } from 'rxjs';

import { UserService } from '@app/core/user.service';
import { switchMap, mapTo, catchError } from 'rxjs/operators';

export const emailUnique = (userService: UserService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(switchMap(() => {
      return userService.checkEmail(control.value).pipe(
        mapTo(null),
        catchError(err => of({notUnique: true}))
      );
    }));
  };
};
