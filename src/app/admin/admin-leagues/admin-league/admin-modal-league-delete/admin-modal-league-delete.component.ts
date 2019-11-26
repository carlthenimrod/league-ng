import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
  selector: 'app-admin-modal-league-delete',
  templateUrl: './admin-modal-league-delete.component.html'
})
export class AdminModalLeagueDeleteComponent implements OnInit {
  league$: Observable<League>;

  constructor(
    private leagueService: LeagueService,
    private modal: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.league$ = this.leagueService.league$;
  }

  onSubmit() {
    this.leagueService.delete$()
      .subscribe(() => {
        this.router.navigateByUrl('/admin/leagues');
        this.modal.close();
      });
  }
}
