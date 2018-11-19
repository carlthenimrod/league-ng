import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminLeagueFormComponent } from './admin-leagues/admin-league-form/admin-league-form.component';
import { AdminLeagueNewComponent } from './admin-leagues/admin-league-new/admin-league-new.component';
import { AdminLeagueDetailsComponent } from './admin-leagues/admin-league-details/admin-league-details.component';
import { AdminOverviewComponent } from './admin-league/admin-overview/admin-overview.component';
import { AdminModalDivisionComponent } from './admin-league/admin-overview/admin-modal-division/admin-modal-division.component';
import { AdminModalTeamComponent } from './admin-league/admin-overview/admin-modal-team/admin-modal-team.component';
import { AdminDivisionsComponent } from './admin-league/admin-overview/admin-divisions/admin-divisions.component';

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
    AdminSidebarComponent,
    AdminLeaguesComponent,
    AdminLeagueComponent,
    AdminLeagueFormComponent,
    AdminLeagueNewComponent,
    AdminLeagueDetailsComponent,
    AdminOverviewComponent,
    AdminModalDivisionComponent,
    AdminModalTeamComponent,
    AdminDivisionsComponent
  ],
  entryComponents: [
    AdminModalDivisionComponent,
    AdminModalTeamComponent
  ]
})
export class AdminModule { }
