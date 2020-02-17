import { Component, OnInit, Inject } from '@angular/core';

import { MODAL_DATA } from '@app/shared/ui/modal/modal';
import { UIModalService } from '@app/shared/ui/modal/modal.service';
import { TeamService } from '@app/services/team.service';
import { User } from '@app/models/user';

@Component({
  selector: 'admin-modal-user-remove',
  templateUrl: './admin-modal-user-remove.component.html'
})
export class AdminModalUserRemoveComponent implements OnInit {
  user: User;

  constructor(
    @Inject(MODAL_DATA) private data: { user: User },
    private modal: UIModalService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.user = this.data.user;
  }

  onSubmit() {
    this.teamService.userDelete$(this.user)
      .subscribe(() => this.modal.close());
  }
}
