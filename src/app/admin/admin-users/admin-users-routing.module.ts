import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUsersComponent } from './admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

const routes: Routes = [
  { path: '', component: AdminUsersComponent, children: [
    { path: ':id', component: AdminUserComponent },
    { path: '**', component: AdminUserListComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
