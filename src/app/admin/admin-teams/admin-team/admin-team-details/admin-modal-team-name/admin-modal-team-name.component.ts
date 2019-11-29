import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-modal-team-name',
  templateUrl: './admin-modal-team-name.component.html'
})
export class AdminModalTeamNameComponent implements OnInit {
  team$: Observable<Team>;

  constructor(
    private modal: ModalService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.team$ = this.teamService.team$;
  }

  onSubmit(team: Partial<Team>) {
    this.teamService.put$(team)
      .subscribe(() => this.modal.close());
  }
}
