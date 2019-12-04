import { Component, Input, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalService } from '@app/shared/modal/modal.service';
import { AdminModalUserComponent } from './admin-modal-user/admin-modal-user.component';
import { User } from '@app/models/user';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { usersEnterTrigger, userEnterTrigger } from './animations';
import { AdminModalAddUserComponent } from './admin-modal-add-user/admin-modal-add-user.component';

@Component({
  selector: 'app-admin-team-roster',
  templateUrl: './admin-team-roster.component.html',
  styleUrls: ['./admin-team-roster.component.scss'],
  animations: [usersEnterTrigger, userEnterTrigger]
})
export class AdminTeamRosterComponent {
  @Input() team: Team;

  constructor(
    private dialog: MatDialog,
    private injector: Injector,
    private modal: ModalService,
    private teamService: TeamService
  ) { }

  onClickAddUser() {
    const dialogRef = this.dialog.open(AdminModalUserComponent, {
      autoFocus: false,
      data: {
        team: this.team
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((data: {user: User, roles: string[]}) => {
      if (!data) { return; }

      const {user, roles} = data;

      this.teamService.addUser(user, roles);
    });
  }

  onClickEditRoles(userId: string) {
    const dialogRef = this.dialog.open(AdminModalUserComponent, {
      autoFocus: false,
      data: {
        team: this.team,
        userId: userId
      },
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((data: {user: User, roles: string[]}) => {
      if (!data) { return; }

      const {roles} = data;

      this.teamService.editUser(userId, roles);
    });
  }

  onClickOpenModal(type: string) {
    switch (type) {
      case 'add':
        this.modal.open(AdminModalAddUserComponent, {
          injector: this.injector
        });
        break;
    }
  }

  trackById(index: number, user: User) {
    return user._id;
  }
}
