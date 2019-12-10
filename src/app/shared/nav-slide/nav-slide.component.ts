import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav-slide',
  styleUrls: ['./nav-slide.component.scss'],
  template: `
    <nav>
      <ng-content></ng-content>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NavSlideComponent { }
