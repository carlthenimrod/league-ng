import { Component, OnInit, OnDestroy, ContentChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { Me } from '@app/models/auth';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'ngl-desktop-nav',
  styleUrls: ['./desktop-nav.component.scss'],
  templateUrl: './desktop-nav.component.html'
})
export class DesktopNavComponent implements OnInit, OnDestroy {
  me: Me;
  @ContentChild(LogoComponent) logo: LogoComponent;
  private _unsub$ = new Subject<void>();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.me$
      .pipe(takeUntil(this._unsub$))
      .subscribe(me => this.me = me);
  }

  ngOnDestroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
