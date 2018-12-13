import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminLeagueFormComponent } from './admin-league/admin-league-form/admin-league-form.component';
import { AdminLeagueNewComponent } from './admin-league/admin-league-new/admin-league-new.component';
import { AdminLeagueDetailsComponent } from './admin-league/admin-league-details/admin-league-details.component';
import { AdminOverviewComponent } from './admin-league/admin-overview/admin-overview.component';
import { AdminModalDivisionComponent } from './admin-league/admin-overview/admin-modal-division/admin-modal-division.component';
import { AdminModalTeamComponent } from './admin-league/admin-overview/admin-modal-team/admin-modal-team.component';
import { AdminDivisionsComponent } from './admin-league/admin-overview/admin-divisions/admin-divisions.component';
import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { AdminUtilityComponent } from './admin-utility/admin-utility.component';
import { AdminPaginationComponent } from './admin-utility/admin-pagination/admin-pagination.component';
import { AdminSearchComponent } from './admin-utility/admin-search/admin-search.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminTeamNewComponent } from './admin-team/admin-team-new/admin-team-new.component';
import { AdminTeamDetailsComponent } from './admin-team/admin-team-details/admin-team-details.component';
import { AdminTeamFormComponent } from './admin-team/admin-team-form/admin-team-form.component';
import { AdminTeamListComponent } from './admin-league/admin-overview/admin-team-list/admin-team-list.component';
import { AdminDroppableComponent } from './admin-droppable/admin-droppable.component';
import { AdminDraggableDirective } from './admin-droppable/admin-draggable.directive';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminRosterComponent } from './admin-team/admin-roster/admin-roster.component';
import { AdminModalUserComponent } from './admin-team/admin-roster/admin-modal-user/admin-modal-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminNavComponent,
    AdminLeaguesComponent,
    AdminLeagueComponent,
    AdminLeagueFormComponent,
    AdminLeagueNewComponent,
    AdminLeagueDetailsComponent,
    AdminOverviewComponent,
    AdminModalDivisionComponent,
    AdminModalTeamComponent,
    AdminDivisionsComponent,
    AdminTeamsComponent,
    AdminUtilityComponent,
    AdminPaginationComponent,
    AdminSearchComponent,
    AdminTeamComponent,
    AdminTeamNewComponent,
    AdminTeamDetailsComponent,
    AdminTeamFormComponent,
    AdminTeamListComponent,
    AdminDroppableComponent,
    AdminDraggableDirective,
    AdminUsersComponent,
    AdminUserComponent,
    AdminRosterComponent,
    AdminModalUserComponent
  ],
  entryComponents: [
    AdminModalDivisionComponent,
    AdminModalTeamComponent,
    AdminModalUserComponent
  ]
})
export class AdminModule { }
