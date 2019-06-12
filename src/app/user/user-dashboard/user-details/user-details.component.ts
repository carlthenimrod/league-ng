import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { User } from '@app/models/user';
import { UserModalPasswordComponent } from './user-modal-password/user-modal-password.component';
import { UserService } from '@app/services/user.service';
import { ProfileImg } from '@app/models/profile-img';

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
    private dialog: MatDialog,
    private userService: UserService
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

    this.dialog.open(UserModalPasswordComponent, config);
  }

  onSaveImg(data: { file: File, img: ProfileImg }) {
    const {file, img} = data;

    this.userService.updateImg(file, img).subscribe();
  }
}
