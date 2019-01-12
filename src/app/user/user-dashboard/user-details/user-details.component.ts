import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { User } from '@app/models/user';
import { UserModalPasswordComponent } from './user-modal-password/user-modal-password.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Output() edit: EventEmitter<boolean> = new EventEmitter();
  @Input() user: User;
  tab = 'schedule';

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onClickEdit() {
    this.edit.emit(true);
  }

  onClickPasswordModal() {
    const config: MatDialogConfig = {};
    config.autoFocus = false;
    config.maxWidth = '95vw';
    config.restoreFocus = false;
    config.width = '400px';

    const dialog = this.dialog.open(UserModalPasswordComponent, config);
  }
}
