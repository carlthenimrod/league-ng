import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminLeaguesComponent } from './admin-leagues/admin-leagues.component';
import { AdminLeagueComponent } from './admin-leagues/admin-league/admin-league.component';
import { AdminLeagueFormComponent } from './admin-leagues/admin-league-form/admin-league-form.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminLeaguesComponent,
    AdminLeagueComponent,
    AdminLeagueFormComponent
  ]
})
export class AdminModule { }
