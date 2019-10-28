import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminTeamsRoutingModule } from './admin-teams-routing.module';
import { AdminTeamsComponent } from './admin-teams.component';
import { AdminTeamListComponent } from './admin-team-list/admin-team-list.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminTeamFormComponent } from './admin-team/admin-team-form/admin-team-form.component';
import { AdminRosterComponent } from './admin-team/admin-roster/admin-roster.component';
import { AdminTeamDetailsComponent } from './admin-team/admin-team-details/admin-team-details.component';

@NgModule({
  declarations: [
    AdminTeamsComponent,
    AdminTeamComponent,
    AdminTeamListComponent,
    AdminTeamDetailsComponent,
    AdminTeamFormComponent,
    AdminRosterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AdminTeamsRoutingModule
  ]
})
export class AdminTeamsModule { }
