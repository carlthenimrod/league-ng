import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss']
})
export class AdminUserDetailsComponent implements OnInit {
  @Input() user: User;
  @Output('editClick') editClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.emit(true);
  }

  onDeleteClick() {
    const name = prompt('Warning: Cannot be undone! Enter user\'s name to confirm:');

    if (!name) { return; }

    if (this.user.fullName === name.trim()) {
      this.userService.delete(this.user._id).subscribe(() => {
        this.router.navigate(['/', 'admin', 'users']);
      });
    } else {
      alert('Error: User name entered doesn\'t match.');
    }
  }
}
