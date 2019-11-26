import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
  selector: 'app-admin-modal-league-new',
  templateUrl: './admin-modal-league-new.component.html'
})
export class AdminModalLeagueNewComponent {
  constructor(
    private leagueService: LeagueService,
    private modal: ModalService,
    private router: Router
  ) {}

  onSubmit(league: League) {
    this.leagueService.post$(league)
      .subscribe(newLeague =>
        this.router.navigate(['admin', 'leagues', newLeague._id])
          .then(() => this.modal.close())
      );
  }
}
