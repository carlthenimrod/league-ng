import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFormComponent } from './user-dashboard/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserComponent, children: [
    { path: '', component: UserDashboardComponent },
    { path: 'edit', component: UserFormComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
