import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueNewComponent } from './admin-league/admin-league-new/admin-league-new.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { AdminTeamNewComponent } from './admin-team/admin-team-new/admin-team-new.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserNewComponent } from './admin-user/admin-user-new/admin-user-new.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'leagues', component: AdminLeaguesComponent },
    { path: 'leagues/new', component: AdminLeagueNewComponent },
    { path: 'leagues/:id', component: AdminLeagueComponent },
    { path: 'teams', component: AdminTeamsComponent },
    { path: 'teams/new', component: AdminTeamNewComponent },
    { path: 'teams/:id', component: AdminTeamComponent },
    { path: 'users', component: AdminUsersComponent },
    { path: 'users/new', component: AdminUserNewComponent },
    { path: 'users/:id', component: AdminUserComponent },
    { path: '**', component: AdminDashboardComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
