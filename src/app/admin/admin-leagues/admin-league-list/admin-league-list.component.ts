import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { ModalService } from '@app/shared/modal/modal.service';
import { AdminModalLeagueNewComponent } from './admin-modal-league-new/admin-modal-league-new.component';

@Component({
  selector: 'app-admin-league-list',
  templateUrl: './admin-league-list.component.html'
})
export class AdminLeagueListComponent implements OnInit {
  leagues$: Observable<League[]>;

  constructor(
    private leagueService: LeagueService,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.leagues$ = this.leagueService.get$();
  }

  onClickOpenModal() {
    this.modal.open(AdminModalLeagueNewComponent);
  }
}
