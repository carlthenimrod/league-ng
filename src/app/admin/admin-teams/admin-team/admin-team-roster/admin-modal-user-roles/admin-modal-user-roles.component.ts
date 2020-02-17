import { Component, Inject, OnInit } from '@angular/core';

import { MODAL_DATA } from '@app/shared/modal/modal';
import { ModalService } from '@app/shared/modal/modal.service';
import { TeamService } from '@app/services/team.service';
import { User } from '@app/models/user';

@Component({
  selector: 'admin-modal-user-roles',
  templateUrl: './admin-modal-user-roles.component.html'
})
export class AdminModalUserRolesComponent implements OnInit {
  user: User;

  constructor(
    @Inject(MODAL_DATA) private data: { user: User },
    private modal: ModalService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.user = this.data.user;
  }

  onSubmit(user: Pick<User, 'roles'>) {
    this.teamService.userPut$({ ...user, _id: this.user._id })
      .subscribe(() => this.modal.close());
  }
}

