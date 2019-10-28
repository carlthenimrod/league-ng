import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AdminModalUserComponent } from './admin-modal-user/admin-modal-user.component';
import { User } from '@app/models/user';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { usersEnterTrigger, userEnterTrigger } from './animations';

@Component({
  selector: 'app-admin-roster',
  templateUrl: './admin-roster.component.html',
  styleUrls: ['./admin-roster.component.scss'],
  animations: [usersEnterTrigger, userEnterTrigger]
})
export class AdminRosterComponent {
  @Input() team: Team;

  constructor(
    private dialog: MatDialog,
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

  trackById(index: number, user: User) {
    return user._id;
  }
}
