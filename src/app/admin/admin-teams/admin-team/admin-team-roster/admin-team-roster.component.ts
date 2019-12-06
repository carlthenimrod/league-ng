import { Component, Input, Injector } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { AdminModalAddUserComponent } from './admin-modal-add-user/admin-modal-add-user.component';
import { AdminModalUserRolesComponent } from './admin-modal-user-roles/admin-modal-user-roles.component';

@Component({
  selector: 'app-admin-team-roster',
  templateUrl: './admin-team-roster.component.html',
  styleUrls: ['./admin-team-roster.component.scss']
})
export class AdminTeamRosterComponent {
  @Input() team: Team;

  constructor(
    private injector: Injector,
    private modal: ModalService,
    private teamService: TeamService
  ) { }

  onClickOpenModal(type: string, userId: string) {
    switch (type) {
      case 'add':
        this.modal.open(AdminModalAddUserComponent, {
          injector: this.injector
        });
        break;
      case 'roles':
        this.modal.open(AdminModalUserRolesComponent, {
          injector: this.injector,
          data: { userId }
        });
        break;
    }
  }
}
