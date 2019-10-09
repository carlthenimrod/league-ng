import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserResolverService } from './user-resolver.service';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: UserComponent, children: [
    { path: '', component: UserDashboardComponent, resolve: { user: UserResolverService } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolverService]
})
export class UserRoutingModule { }
