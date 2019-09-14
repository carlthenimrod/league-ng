import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueComponent } from './league.component';
import { LeagueResolver } from './league-resolver.service';

const routes: Routes = [{
  path: ':id', component: LeagueComponent, resolve: { league: LeagueResolver }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LeagueResolver]
})
export class LeagueRoutingModule {}
