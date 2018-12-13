import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AdminModalUserComponent } from './admin-modal-user/admin-modal-user.component';
import { User } from '@app/models/user';
import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';

@Component({
  selector: 'app-admin-roster',
  templateUrl: './admin-roster.component.html',
  styleUrls: ['./admin-roster.component.scss']
})
export class AdminRosterComponent implements OnInit {

  @Input() team: Team;

  constructor(
    private dialog: MatDialog,
    private teamService: TeamService
  ) { }

  ngOnInit() {
  }

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
      const {user, roles} = data;

      if (!user) { return; }

      this.teamService.saveUser(user, roles);
    });
  }
}
