import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminTeamsComponent } from './admin-teams.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminTeamListComponent } from './admin-team-list/admin-team-list.component';

const routes: Routes = [
  { path: '', component: AdminTeamsComponent, children: [
    { path: ':id', component: AdminTeamComponent },
    { path: '**', component: AdminTeamListComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTeamsRoutingModule { }
