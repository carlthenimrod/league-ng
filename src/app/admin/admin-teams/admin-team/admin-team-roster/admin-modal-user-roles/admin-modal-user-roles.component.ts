import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MODAL_DATA } from '@app/shared/modal/modal';
import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { User } from '@app/models/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-modal-user-roles',
  templateUrl: './admin-modal-user-roles.component.html'
})
export class AdminModalUserRolesComponent implements OnInit {
  team$: Observable<Team>;
  user: User;

  constructor(
    @Inject(MODAL_DATA) private data: { userId: string },
    private modal: ModalService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.team$ = this.teamService.team$
      .pipe(
        tap(team =>
          this.user = team.users.find(u => u._id === this.data.userId)
        )
      );
  }

  onSubmit(user: Pick<User, 'roles'>) {
    this.teamService.userPut$({ ...user, _id: this.user._id })
      .subscribe(() => this.modal.close());
  }
}

