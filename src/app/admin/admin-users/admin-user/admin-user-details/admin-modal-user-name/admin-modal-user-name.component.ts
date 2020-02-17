import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'admin-modal-user-name',
  templateUrl: './admin-modal-user-name.component.html'
})
export class AdminModalUserNameComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private modal: ModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  onSubmit(user: Partial<User>) {
    this.userService.put$(user)
      .subscribe(() => this.modal.close());
  }
}
