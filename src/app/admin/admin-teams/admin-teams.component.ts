import { Component } from '@angular/core';

import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-teams',
  template: '<router-outlet></router-outlet>',
  providers: [TeamService]
})
export class AdminTeamsComponent { }
