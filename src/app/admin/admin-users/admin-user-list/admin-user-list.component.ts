import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { AdminModalUserNewComponent } from './admin-modal-user-new/admin-modal-user-new.component';

@Component({
  selector: 'admin-user-list',
  templateUrl: './admin-user-list.component.html'
})
export class AdminUserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(
    private modal: ModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.get$();
  }

  onClickOpenModal() {
    this.modal.open(AdminModalUserNewComponent);
  }
}
