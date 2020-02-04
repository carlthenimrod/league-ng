import { Component, HostBinding } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'ngl-sign-up-complete',
  styleUrls: ['sign-up-complete.component.scss'],
  templateUrl: 'sign-up-complete.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SignUpCompleteComponent {
  @HostBinding('@fadeIn') fadeIn;
}
