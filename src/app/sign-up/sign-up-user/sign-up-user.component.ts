import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngl-sign-up-user',
  templateUrl: './sign-up-user.component.html'
})
export class SignUpUserComponent {
  @Input() userForm: FormGroup;
  @Output() userComplete = new EventEmitter<void>();

  get email() { return this.userForm.get('email'); }
}
