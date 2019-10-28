import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { AdminLeaguesRoutingModule } from './admin-leagues-routing.module';
import { AdminLeaguesComponent } from './admin-leagues.component';
import { AdminLeagueListComponent } from './admin-league-list/admin-league-list.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminLeagueHeaderComponent } from './admin-league/admin-league-header/admin-league-header.component';
import { AdminOverviewComponent } from './admin-league/admin-overview/admin-overview.component';
import { AdminLeagueScheduleComponent } from './admin-league/admin-league-schedule/admin-league-schedule.component';
import { AdminDivisionsComponent } from './admin-league/admin-overview/admin-divisions/admin-divisions.component';
import { AdminTeamListComponent } from './admin-league/admin-overview/admin-team-list/admin-team-list.component';
import { AdminGameGroupComponent } from './admin-league/admin-league-schedule/admin-game-group/admin-game-group.component';
import { AdminDraggableDirective } from './admin-droppable/admin-draggable.directive';
import { AdminDroppableComponent } from './admin-droppable/admin-droppable.component';

@NgModule({
  declarations: [
    AdminLeaguesComponent,
    AdminLeagueComponent,
    AdminLeagueHeaderComponent,
    AdminOverviewComponent,
    AdminLeagueScheduleComponent,
    AdminDivisionsComponent,
    AdminTeamListComponent,
    AdminGameGroupComponent,
    AdminDraggableDirective,
    AdminDroppableComponent,
    AdminLeagueListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminLeaguesRoutingModule
  ]
})
export class AdminLeaguesModule { }
