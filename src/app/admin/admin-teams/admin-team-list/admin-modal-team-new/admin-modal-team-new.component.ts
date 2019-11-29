import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-modal-team-new',
  templateUrl: './admin-modal-team-new.component.html'
})
export class AdminModalTeamNewComponent {
  constructor(
    private modal: ModalService,
    private router: Router,
    private teamService: TeamService
  ) { }

  onSubmit(team: Team) {
    this.teamService.post$(team)
      .subscribe(newTeam =>
        this.router.navigate(['admin', 'teams', newTeam._id])
          .then(() => this.modal.close())
      );
  }
}
