import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer, of } from 'rxjs';
import { mapTo, switchMap, catchError } from 'rxjs/operators';

import { TeamService } from '@app/services/team.service';

@Injectable({
  providedIn: 'root'
})
export class TeamExistsValidator implements AsyncValidator {
  constructor(private teamService: TeamService) { }

  validate(control: AbstractControl): Observable<null | ValidationErrors> {
    return timer(500)
      .pipe(
        switchMap(() => this.teamService.teamExists$(control.value)),
        mapTo(null),
        catchError(() =>
          of({ teamExists: true })
        )
      );
  }
}
