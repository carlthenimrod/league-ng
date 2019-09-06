import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamResolverService } from './team-resolver.service';

const routes: Routes = [
  {
    path: ':id', component: TeamComponent, resolve: { team: TeamResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
