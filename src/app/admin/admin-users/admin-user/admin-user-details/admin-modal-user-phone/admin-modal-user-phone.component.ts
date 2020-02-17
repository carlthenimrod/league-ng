import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'admin-modal-user-phone',
  templateUrl: './admin-modal-user-phone.component.html'
})
export class AdminModalUserPhoneComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private modal: UIModalService,
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
