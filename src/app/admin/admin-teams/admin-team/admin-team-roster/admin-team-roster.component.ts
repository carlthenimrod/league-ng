import { Component, Input, Injector } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { User } from '@app/models/user';
import { AdminModalUserAddComponent } from './admin-modal-user-add/admin-modal-user-add.component';
import { AdminModalUserRemoveComponent } from './admin-modal-user-remove/admin-modal-user-remove.component';
import { AdminModalUserRolesComponent } from './admin-modal-user-roles/admin-modal-user-roles.component';

@Component({
  selector: 'admin-team-roster',
  templateUrl: './admin-team-roster.component.html',
  styleUrls: ['./admin-team-roster.component.scss']
})
export class AdminTeamRosterComponent {
  @Input() team: Team;

  constructor(
    private injector: Injector,
    private modal: ModalService
  ) { }

  onClickOpenModal(type: string, user?: User) {
    switch (type) {
      case 'add':
        this.modal.open(AdminModalUserAddComponent, {
          injector: this.injector
        });
        break;
      case 'remove':
        this.modal.open(AdminModalUserRemoveComponent, {
          injector: this.injector,
          data: { user }
        });
        break;
      case 'roles':
        this.modal.open(AdminModalUserRolesComponent, {
          injector: this.injector,
          data: { user }
        });
        break;
    }
  }
}
