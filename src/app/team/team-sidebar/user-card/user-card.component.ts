import { Component, OnInit, Input, HostListener, Output, EventEmitter, HostBinding, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/models/user';
import { ViewportService } from '@app/services/viewport.service';
import { lightboxTrigger, usercardTrigger } from './animations';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  animations: [lightboxTrigger, usercardTrigger]
})
export class UserCardComponent implements OnInit, OnDestroy {
  self = false;
  initialized = false;
  messageForm = this.fb.group({
    message: ['']
  });
  unsubscribe$ = new Subject<void>();
  @Input() user: User;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @HostBinding('@lightbox') viewportState: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private viewport: ViewportService
  ) {}

  @HostListener('document:click')
  public outsideClick(): void {
    if (!this.initialized) {
      this.initialized = true;
      return;
    }

    this.close.emit(true);
  }

  @HostListener('click', ['$event'])
  public lightboxClick($event: MouseEvent): void {
    this.close.emit(true);
    $event.stopPropagation();
  }

  ngOnInit() {
    this.auth.me$
      .pipe(take(1))
      .subscribe(me => {
        this.self = (me && me._id === this.user._id) ? true : false;
      });

    this.viewport.type$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(type => {
        this.viewportState = type;
      });
  }

  onUserCardClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
