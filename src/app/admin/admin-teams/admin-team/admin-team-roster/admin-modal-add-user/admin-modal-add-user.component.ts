import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-modal-add-user',
  templateUrl: './admin-modal-add-user.component.html'
})
export class AdminModalAddUserComponent implements OnInit {
  team$: Observable<Team>;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.team$ = this.teamService.team$;
  }

  onSubmit(v) {
    console.log('submitted!');
    console.log(v);
  }
}
