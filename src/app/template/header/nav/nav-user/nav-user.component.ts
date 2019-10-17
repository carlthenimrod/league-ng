import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Me } from '@app/models/auth';
import { NavService } from '../nav.service';
import { SocketService } from '@app/services/socket.service';
import { ViewportService } from '@app/services/viewport.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit, OnDestroy {
  @Input() me: Me;
  isMobile: boolean;
  showMenu: boolean;
  connected$: Observable<boolean>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private navService: NavService,
    private socket: SocketService,
    private viewport: ViewportService
  ) { }

  ngOnInit() {
    this.viewport.type$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.isMobile = (type === 'mobile') ? true : false;
      });

    this.connected$ = this.socket.connected$;
  }

  onClick(url?: string[]) {
    this.navService.navigate(url);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
