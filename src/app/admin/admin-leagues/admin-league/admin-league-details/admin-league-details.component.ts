import { Component, Input, Injector } from '@angular/core';

import { League } from '@app/models/league';
import { ModalService } from '@app/shared/modal/modal.service';
import { AdminModalLeagueNameComponent } from './admin-modal-league-name/admin-modal-league-name.component';
import { AdminModalLeagueDescriptionComponent } from './admin-modal-league-description/admin-modal-league-description.component';

@Component({
  selector: 'admin-league-details',
  templateUrl: './admin-league-details.component.html'
})
export class AdminLeagueDetailsComponent {
  @Input() league: League;

  constructor(
    private injector: Injector,
    private modal: ModalService
  ) { }

  onClickOpenModal(type: string, _id?: string) {
    switch (type) {
      case 'name':
        this.modal.open(AdminModalLeagueNameComponent, {
          injector: this.injector
        });
        break;
      case 'description':
        this.modal.open(AdminModalLeagueDescriptionComponent, {
          injector: this.injector
        });
    }
  }
}
