import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'admin-modal-team-name',
  templateUrl: './admin-modal-team-name.component.html'
})
export class AdminModalTeamNameComponent implements OnInit {
  team$: Observable<Team>;

  constructor(
    private modal: UIModalService,
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
