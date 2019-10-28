import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLeaguesComponent } from './admin-leagues.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminLeagueListComponent } from './admin-league-list/admin-league-list.component';

const routes: Routes = [
  { path: '', component: AdminLeaguesComponent, children: [
    { path: ':id', component: AdminLeagueComponent },
    { path: '**', component: AdminLeagueListComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLeaguesRoutingModule { }
