import { Component, Input, Injector } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { AdminModalUserEmergencyComponent } from './admin-modal-user-emergency/admin-modal-user-emergency.component';
import { AdminModalUserCommentsComponent } from './admin-modal-user-comments/admin-modal-user-comments.component';

@Component({
  selector: 'app-admin-user-additional',
  templateUrl: './admin-user-additional.component.html'
})
export class AdminUserAdditionalComponent {
  @Input() user: User;

  constructor(
    private injector: Injector,
    private modal: ModalService
  ) { }

  onClickOpenModal(value: string) {
    switch (value) {
      case 'emergency':
          this.modal.open(AdminModalUserEmergencyComponent, {
            injector: this.injector
          });
        break;
      case 'comments':
        this.modal.open(AdminModalUserCommentsComponent, {
          injector: this.injector
        });
        break;
    }
  }
}