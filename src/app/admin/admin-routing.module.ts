import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueFormComponent } from './admin-league/admin-league-form/admin-league-form.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminTeamFormComponent } from './admin-team/admin-team-form/admin-team-form.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserFormComponent } from './admin-user/admin-user-form/admin-user-form.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AdminPlaceFormComponent } from './admin-place/admin-place-form/admin-place-form.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'leagues', component: AdminLeaguesComponent },
    { path: 'leagues/new', component: AdminLeagueFormComponent },
    { path: 'leagues/:id', component: AdminLeagueComponent },
    { path: 'teams', component: AdminTeamsComponent },
    { path: 'teams/new', component: AdminTeamFormComponent },
    { path: 'teams/:id', component: AdminTeamComponent },
    { path: 'users', component: AdminUsersComponent },
    { path: 'users/new', component: AdminUserFormComponent },
    { path: 'users/:id', component: AdminUserComponent },
    { path: 'places', component: AdminPlacesComponent },
    { path: 'places/new', component: AdminPlaceFormComponent },
    { path: 'places/:id', component: AdminPlaceComponent },
    { path: 'settings', component: AdminSettingsComponent },
    { path: '**', component: AdminDashboardComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
