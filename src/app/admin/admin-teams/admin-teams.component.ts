import { Component } from '@angular/core';

import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'admin-teams',
  template: '<router-outlet></router-outlet>',
  providers: [TeamService]
})
export class AdminTeamsComponent { }
