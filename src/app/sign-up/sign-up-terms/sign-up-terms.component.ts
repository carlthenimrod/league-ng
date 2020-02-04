import { Component } from '@angular/core';

@Component({
  selector: 'ngl-sign-up-terms',
  styleUrls: ['./sign-up-terms.component.scss'],
  templateUrl: './sign-up-terms.component.html'
})
export class SignUpTermsComponent {
  accepted = false;

  onScroll(e: Event) {
    const el = e.target as HTMLElement;
    const scrollMax = el.scrollHeight - el.clientHeight;

    this.accepted = el.scrollTop === scrollMax ? true : false;
  }
}
