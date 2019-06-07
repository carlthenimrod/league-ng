import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

import { User } from '@app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  initialized = false;
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

  constructor() {}

  ngOnInit() {
    console.log(this.user);
  }
}
