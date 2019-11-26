import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
  selector: 'app-admin-modal-league-description',
  templateUrl: './admin-modal-league-description.component.html'
})
export class AdminModalLeagueDescriptionComponent implements OnInit {
  league$: Observable<League>;

  constructor(
    private leagueService: LeagueService,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.league$ = this.leagueService.league$;
  }

  onSubmit(value: { description: string }) {
    this.leagueService.put$(value)
      .subscribe(() => this.modal.close());
  }
}