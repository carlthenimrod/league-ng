import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'ngl-sign-up-team',
  styleUrls: ['./sign-up-team.component.scss'],
  templateUrl: './sign-up-team.component.html'
})
export class SignUpTeamComponent {
  @Input() teamForm: FormGroup;

  get name(): FormControl {
    return this.teamForm.get('name') as FormControl;
  }

  get roster(): FormArray {
    return this.teamForm.get('roster') as FormArray;
  }

  constructor(
    private modal: UIModalService
  ) { }

  onClickAddUser() {
    this.modal.open(SignUpModalComponent);

    this.modal.closed$
      .pipe(take(1))
      .subscribe((result: FormGroup) =>
        result && this.roster.push(result)
      );
  }

  removeUser(i: number) {
    this.roster.removeAt(i);
  }
}
