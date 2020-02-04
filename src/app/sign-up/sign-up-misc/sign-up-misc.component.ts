import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngl-sign-up-misc',
  templateUrl: './sign-up-misc.component.html'
})
export class SignUpMiscComponent {
  @Input() miscForm: FormGroup;
}
