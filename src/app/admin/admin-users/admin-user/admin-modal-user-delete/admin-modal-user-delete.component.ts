import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'admin-modal-user-delete',
  templateUrl: 'admin-modal-user-delete.component.html'
})
export class AdminModalUserDeleteComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private modal: ModalService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  onSubmit() {
    this.userService.delete$().subscribe(() =>
      this.router.navigateByUrl('admin/users')
        .then(() => this.modal.close())
    );
  }
}
