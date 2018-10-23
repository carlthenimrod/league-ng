import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueComponent } from './admin-leagues/admin-league/admin-league.component';
import { AdminLeagueFormComponent } from './admin-leagues/admin-league-form/admin-league-form.component';
import { AdminLeagueNewComponent } from './admin-leagues/admin-league-new/admin-league-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminLeaguesComponent,
    AdminLeagueComponent,
    AdminLeagueFormComponent,
    AdminLeagueNewComponent
  ]
})
export class AdminModule { }
