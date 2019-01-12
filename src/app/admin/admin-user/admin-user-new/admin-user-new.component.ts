import { Component, OnInit } from '@angular/core';

import { User } from '@app/models/user';

@Component({
  selector: 'app-admin-user-new',
  templateUrl: './admin-user-new.component.html',
  styleUrls: ['./admin-user-new.component.scss']
})
export class AdminUserNewComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user = {
      name: {
        first: '',
        last: ''
      },
      status: 'active'
    };
  }
}
