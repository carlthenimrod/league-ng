import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueComponent } from './admin-leagues/admin-league/admin-league.component';
import { AdminLeagueFormComponent } from './admin-leagues/admin-league-form/admin-league-form.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'leagues', component: AdminLeaguesComponent },
    { path: 'leagues/new', component: AdminLeagueFormComponent },
    { path: 'leagues/:id', component: AdminLeagueComponent },
    { path: '**', component: AdminDashboardComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
