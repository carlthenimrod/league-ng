import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { AdminModalUserDeleteComponent } from './admin-modal-user-delete/admin-modal-user-delete.component';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {
  selected = 'details';
  settings = false;
  user$: Observable<User>;

  constructor(
    private injector: Injector,
    private modal: ModalService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => this.userService.get$(params.get('id'))),
      switchMap(() => this.userService.user$)
    );
  }

  onClickOpenModal() {
    this.modal.open(AdminModalUserDeleteComponent, {
      injector: this.injector
    });
  }
}
