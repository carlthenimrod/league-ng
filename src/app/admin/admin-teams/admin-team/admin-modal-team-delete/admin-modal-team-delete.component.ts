import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-modal-team-delete',
  templateUrl: './admin-modal-team-delete.component.html'
})
export class AdminModalTeamDeleteComponent implements OnInit {
  team$: Observable<Team>;

  constructor(
    private modal: UIModalService,
    private router: Router,
    private teamService: TeamService
  ) { }

   ngOnInit() {
    this.team$ = this.teamService.team$;
   }

   onSubmit() {
    this.teamService.delete$()
      .subscribe(() => {
        this.router.navigateByUrl('/admin/teams');
        this.modal.close();
      });
   }
}

