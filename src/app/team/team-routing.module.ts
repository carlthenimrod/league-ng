import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';

const routes: Routes = [
  { path: '', component: TeamComponent, children: [
    { path: '', component: TeamDashboardComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
