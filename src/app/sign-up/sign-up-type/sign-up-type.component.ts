import { Component, Output, EventEmitter, HostBinding } from '@angular/core';

import { fadeTrigger } from './animations';

@Component({
  selector: 'ngl-sign-up-type',
  styleUrls: ['./sign-up-type.component.scss'],
  templateUrl: './sign-up-type.component.html',
  animations: [fadeTrigger]
})
export class SignUpTypeComponent {
  @HostBinding('@fade') state = 'active';
  @Output() select = new EventEmitter<string>();
}
