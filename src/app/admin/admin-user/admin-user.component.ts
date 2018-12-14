import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '@app/models/user';
import { UserService } from '@app/core/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;
  editingUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userService.get(params.get('id'));
        return this.userService.userListener();
      })
    )
    .subscribe((user: User) => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
