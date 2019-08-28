import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent {
  @Output() linkClick = new EventEmitter<boolean>();

  constructor() { }

  onClick() {
    this.linkClick.emit(true);
  }
}
