import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.scss']
})
export class AdminUserFormComponent implements OnInit {

  @Input() user: User;
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  oldUser: User;
  new: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.user._id) {
      this.new = true;
    } else {
      this.new = false;
    }

    // create copy
    this.oldUser = {...this.user};
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(
      (user: User) => {
        this.user = user;

        if (this.new) {
          this.router.navigate(['admin', 'users', user._id]);
        } else {
          this.saveClick.emit(true);
        }
      }
    );
  }

  onCancel() {
    // reset values to old user
    this.user.name = this.oldUser.name;

    this.cancelClick.emit(true);
  }
}
