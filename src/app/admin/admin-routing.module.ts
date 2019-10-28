import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-leagues/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserFormComponent } from './admin-user/admin-user-form/admin-user-form.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AdminPlaceFormComponent } from './admin-place/admin-place-form/admin-place-form.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    {
      path: 'leagues',
      loadChildren: () =>
        import('./admin-leagues/admin-leagues.module')
          .then(m => m.AdminLeaguesModule)
    },
    {
      path: 'teams',
        loadChildren: () =>
          import('./admin-teams/admin-teams.module')
            .then(m => m.AdminTeamsModule)
    },
    { path: 'users', component: AdminUsersComponent },
    { path: 'users/new', component: AdminUserFormComponent },
    { path: 'users/:id', component: AdminUserComponent },
    { path: 'places', component: AdminPlacesComponent },
    { path: 'places/new', component: AdminPlaceFormComponent },
    { path: 'places/:id', component: AdminPlaceComponent },
    { path: '**', component: AdminDashboardComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
