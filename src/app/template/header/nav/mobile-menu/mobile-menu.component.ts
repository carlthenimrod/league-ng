import { Component, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { Me } from '@app/models/auth';

@Component({
  selector: 'ngl-mobile-menu',
  styleUrls: ['./mobile-menu.component.scss'],
  templateUrl: './mobile-menu.component.html'
})
export class MobileNavMenuComponent implements OnInit, OnDestroy {
  @HostBinding('class.open') @Input() open: boolean;
  me: Me;
  selected: string;
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
