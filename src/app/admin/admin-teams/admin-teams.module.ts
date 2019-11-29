import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminTeamsRoutingModule } from './admin-teams-routing.module';
import { AdminTeamsComponent } from './admin-teams.component';
import { AdminTeamListComponent } from './admin-team-list/admin-team-list.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminRosterComponent } from './admin-team/admin-roster/admin-roster.component';
import { AdminTeamDetailsComponent } from './admin-team/admin-team-details/admin-team-details.component';
import { AdminModalUserComponent } from './admin-team/admin-roster/admin-modal-user/admin-modal-user.component';
import { AdminModalTeamDeleteComponent } from './admin-team/admin-modal-team-delete/admin-modal-team-delete.component';
import { AdminModalTeamNewComponent } from './admin-team-list/admin-modal-team-new/admin-modal-team-new.component';
import { AdminModalTeamNameComponent } from './admin-team/admin-team-details/admin-modal-team-name/admin-modal-team-name.component';

@NgModule({
  declarations: [
    AdminTeamsComponent,
    AdminTeamComponent,
    AdminTeamListComponent,
    AdminTeamDetailsComponent,
    AdminRosterComponent,
    AdminModalUserComponent,
    AdminModalTeamDeleteComponent,
    AdminModalTeamNewComponent,
    AdminModalTeamNameComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminSharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminTeamsRoutingModule
  ],
  entryComponents: [
    AdminModalUserComponent,
    AdminModalTeamDeleteComponent,
    AdminModalTeamNewComponent,
    AdminModalTeamNameComponent
  ]
})
export class AdminTeamsModule { }
