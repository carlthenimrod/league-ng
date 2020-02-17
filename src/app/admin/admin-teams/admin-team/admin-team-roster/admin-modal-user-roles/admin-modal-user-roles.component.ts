import { Component, Inject, OnInit } from '@angular/core';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { MODAL_DATA } from '@app/shared/ui/modal/modal';
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
    private modal: UIModalService,
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

