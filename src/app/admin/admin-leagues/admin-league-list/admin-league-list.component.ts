import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { League, LeagueGroup } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';
import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { AdminModalLeagueNewComponent } from './admin-modal-league-new/admin-modal-league-new.component';

@Component({
  selector: 'admin-league-list',
  templateUrl: './admin-league-list.component.html'
})
export class AdminLeagueListComponent implements OnInit {
  leagues$: Observable<League[]>;
  groups: LeagueGroup[];
  ungrouped: League[];

  constructor(
    private leagueService: LeagueService,
    private modal: UIModalService
  ) { }

  ngOnInit() {
    this.leagues$ = this.leagueService.get$()
      .pipe(
        tap(leagues => {
          const { groups, ungrouped } = this.leagueService.group(leagues);
          this.groups = groups;
          this.ungrouped = ungrouped;
        })
      );
  }

  onClickOpenModal() {
    this.modal.open(AdminModalLeagueNewComponent);
  }
}
