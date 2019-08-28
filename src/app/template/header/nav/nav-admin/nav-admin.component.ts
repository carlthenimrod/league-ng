import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent {
  @Output() linkClick = new EventEmitter<boolean>();

  constructor() { }

  onClick() {
    this.linkClick.emit(true);
  }
}
