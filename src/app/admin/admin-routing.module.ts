import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

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
    { path: 'users',
      loadChildren: () =>
        import('./admin-users/admin-users.module')
          .then(m => m.AdminUsersModule)
    },
    { path: 'places',
      loadChildren: () =>
        import('./admin-places/admin-places.module')
          .then(m => m.AdminPlacesModule)
    }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
