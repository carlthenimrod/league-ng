import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { ModalService } from '@app/shared/modal/modal.service';
import { AdminModalLeagueDeleteComponent } from './admin-modal-league-delete/admin-modal-league-delete.component';

@Component({
  selector: 'app-admin-league',
  templateUrl: './admin-league.component.html',
  providers: [LeagueService]
})
export class AdminLeagueComponent implements OnInit {
  league$: Observable<League>;
  selected = 'details';
  settings = false;

  constructor(
    private injector: Injector,
    private leagueService: LeagueService,
    private modal: ModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.league$ = this.route.paramMap
      .pipe(
        switchMap(params => this.leagueService.get$(params.get('id'))),
        switchMap(() => this.leagueService.league$)
      );
  }

  onClickOpenModal() {
    this.modal.open(AdminModalLeagueDeleteComponent, {
      injector: this.injector
    });
  }
}