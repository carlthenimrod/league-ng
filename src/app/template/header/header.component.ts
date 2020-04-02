import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'ngl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  type$: Observable<string>;
  title = 'ngLeague';

  constructor(
    private _viewport: ViewportService
  ) {
    this.type$ = this._viewport.type$;
  }
}
