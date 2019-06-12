import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  self = false;
  initialized = false;
  messageForm = this.fb.group({
    message: ['']
  });
  @Input() user: User;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @HostListener('document:click')
  public outsideClick(): void {
    if (!this.initialized) {
      this.initialized = true;
      return;
    }

    this.close.emit(true);
  }

  @HostListener('click', ['$event'])
  public insideClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const auth = this.auth.getAuth();
    if (auth._id === this.user._id) { this.self = true; }
  }
}
