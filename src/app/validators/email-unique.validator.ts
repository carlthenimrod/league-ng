import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer, of } from 'rxjs';
import { switchMap, mapTo, catchError } from 'rxjs/operators';

import { UserService } from '@app/services/user.service';

export const emailUnique = (userService: UserService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(switchMap(() => {
      return userService.checkEmail(control.value).pipe(
        mapTo(null),
        catchError(() => of({notUnique: true}))
      );
    }));
  };
};
