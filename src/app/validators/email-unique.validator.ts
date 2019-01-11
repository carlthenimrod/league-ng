import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { UserService } from '@app/core/user.service';

export const emailUnique = (userService: UserService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return Observable.create((obs: Observer<ValidationErrors | null>) => {
      if (control.value) {
        userService.checkEmail(control.value).subscribe(() => {
          obs.next(null);
          obs.complete();
        }, () => {
          obs.next({ notUnique: true });
          obs.complete();
        });
      }
    });
  };
};
