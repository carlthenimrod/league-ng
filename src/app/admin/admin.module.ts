import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueComponent } from './admin-leagues/admin-league/admin-league.component';
import { AdminLeagueFormComponent } from './admin-leagues/admin-league-form/admin-league-form.component';
import { AdminLeagueNewComponent } from './admin-leagues/admin-league-new/admin-league-new.component';
import { AdminLeagueDetailsComponent } from './admin-leagues/admin-league-details/admin-league-details.component';
import { AdminLeagueTeamsComponent } from './admin-leagues/admin-league-teams/admin-league-teams.component';
import { AdminLeagueTeamFormComponent } from './admin-leagues/admin-league-teams/admin-league-team-form/admin-league-team-form.component';
import { AdminLeagueDivisionsComponent } from './admin-leagues/admin-league-divisions/admin-league-divisions.component';
import { AdminLeagueDivisionFormComponent } from './admin-leagues/admin-league-divisions/admin-league-division-form/admin-league-division-form.component';

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
    AdminLeagueTeamsComponent,
    AdminLeagueTeamFormComponent,
    AdminLeagueDivisionsComponent,
    AdminLeagueDivisionFormComponent
  ],
  entryComponents: [
    AdminLeagueTeamFormComponent,
    AdminLeagueDivisionFormComponent
  ]
})
export class AdminModule { }
