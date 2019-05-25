import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamSidebarComponent } from './team-sidebar/team-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamComponent,
    TeamDashboardComponent,
    TeamSidebarComponent
  ]
})
export class TeamModule { }
