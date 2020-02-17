import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { AdminModalTeamNewComponent } from './admin-modal-team-new/admin-modal-team-new.component';

@Component({
  selector: 'admin-team-list',
  templateUrl: './admin-team-list.component.html'
})
export class AdminTeamListComponent implements OnInit {
  teams$: Observable<Team[]>;

  constructor(
    private modal: ModalService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teams$ = this.teamService.get$();
  }

  onClickOpenModal() {
    this.modal.open(AdminModalTeamNewComponent);
  }
}
