import { Component } from '@angular/core';

import { UserService } from '@app/services/user.service';

@Component({
  selector: 'admin-users',
  template: '<router-outlet></router-outlet>',
  providers: [UserService]
})
export class AdminUsersComponent { }
