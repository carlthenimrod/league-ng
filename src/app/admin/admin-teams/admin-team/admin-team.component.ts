import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ModalService } from '@app/shared/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { AdminModalTeamDeleteComponent } from './admin-modal-team-delete/admin-modal-team-delete.component';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss']
})
export class AdminTeamComponent implements OnInit {
  selected = 'details';
  settings = false;
  team$: Observable<Team>;

  constructor(
    private injector: Injector,
    private modal: ModalService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.team$ = this.route.paramMap
      .pipe(
        switchMap(params => this.teamService.get$(params.get('id'))),
        switchMap(() => this.teamService.team$)
      );
  }

  onClickOpenModal() {
    this.modal.open(AdminModalTeamDeleteComponent, {
      injector: this.injector
    });
  }
}
