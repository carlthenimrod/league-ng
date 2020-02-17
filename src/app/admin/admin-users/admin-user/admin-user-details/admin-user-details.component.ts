import { Component, Input, Injector } from '@angular/core';

import { ModalService } from '@app/shared/modal/modal.service';
import { User } from '@app/models/user';
import { AdminModalUserNameComponent } from './admin-modal-user-name/admin-modal-user-name.component';
import { AdminModalUserAddressComponent } from './admin-modal-user-address/admin-modal-user-address.component';
import { AdminModalUserPhoneComponent } from './admin-modal-user-phone/admin-modal-user-phone.component';

@Component({
  selector: 'admin-user-details',
  templateUrl: './admin-user-details.component.html'
})
export class AdminUserDetailsComponent {
  @Input() user: User;

  constructor(
    private injector: Injector,
    private modal: ModalService
  ) { }

  onClickOpenModal(type: string) {
    switch (type) {
      case 'name':
        this.modal.open(AdminModalUserNameComponent, {
          injector: this.injector
        });
        break;
      case 'address':
        this.modal.open(AdminModalUserAddressComponent, {
          injector: this.injector
        });
        break;
      case 'phone':
        this.modal.open(AdminModalUserPhoneComponent, {
          injector: this.injector
        });
        break;
    }
  }
}
