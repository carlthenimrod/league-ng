import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
  selector: 'app-admin-modal-league-name',
  templateUrl: './admin-modal-league-name.component.html'
})
export class AdminModalLeagueNameComponent implements OnInit {
  league$: Observable<League>;

  constructor(
    private leagueService: LeagueService,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.league$ = this.leagueService.league$;
  }

  onSubmit(value: { name: string }) {
    this.leagueService.put$(value)
      .subscribe(() => this.modal.close());
  }
}
