import { Component, Input, Injector } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { AdminModalTeamNameComponent } from './admin-modal-team-name/admin-modal-team-name.component';

@Component({
  selector: 'admin-team-details',
  templateUrl: './admin-team-details.component.html'
})
export class AdminTeamDetailsComponent {
  @Input() team: Team;

  constructor(
    private injector: Injector,
    private modal: ModalService
  ) { }

  onClickOpenModal() {
    this.modal.open(AdminModalTeamNameComponent, {
      injector: this.injector
    });
  }
}
