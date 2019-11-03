import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { AdminModalTeamComponent } from './admin-league/admin-overview/admin-modal-team/admin-modal-team.component';
import { AdminModalDivisionComponent } from './admin-league/admin-overview/admin-modal-division/admin-modal-division.component';
import { AdminModalAutoGenerateComponent } from './admin-league/admin-league-schedule/admin-modal-auto-generate/admin-modal-auto-generate.component';
import { AdminModalAddGameComponent } from './admin-league/admin-league-schedule/admin-modal-add-game/admin-modal-add-game.component';
import { AdminModalEditGroupComponent } from './admin-league/admin-league-schedule/admin-game-group/admin-modal-edit-group/admin-modal-edit-group.component';

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
    AdminLeagueListComponent,
    AdminModalTeamComponent,
    AdminModalDivisionComponent,
    AdminModalAutoGenerateComponent,
    AdminModalAddGameComponent,
    AdminModalEditGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AdminLeaguesRoutingModule
  ],
  entryComponents: [
    AdminModalTeamComponent,
    AdminModalDivisionComponent,
    AdminModalAutoGenerateComponent,
    AdminModalAddGameComponent,
    AdminModalEditGroupComponent
  ]
})
export class AdminLeaguesModule { }
