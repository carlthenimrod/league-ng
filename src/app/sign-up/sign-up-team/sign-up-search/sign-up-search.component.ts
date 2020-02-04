import { Component, ViewEncapsulation } from '@angular/core';

import { UIFormFieldComponent } from '@app/shared/ui/form-field/form-field.component';

@Component({
  selector: 'ngl-sign-up-search',
  styleUrls: ['./sign-up-search.component.scss'],
  templateUrl: './sign-up-search.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SignUpSearchComponent extends UIFormFieldComponent { }
