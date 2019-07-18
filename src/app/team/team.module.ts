import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CalendarModule } from '@app/calendar/calendar.module';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamSidebarComponent } from './team-sidebar/team-sidebar.component';
import { TeamFeedComponent } from './team-dashboard/team-feed/team-feed.component';
import { UserCardComponent } from './team-sidebar/user-card/user-card.component';
import { TeamScheduleComponent } from './team-dashboard/team-schedule/team-schedule.component';
import { TeamSelectedGameComponent } from './team-dashboard/team-schedule/team-selected-game/team-selected-game.component';
import { TeamLeagueStandingsComponent } from './team-dashboard/team-schedule/team-league-standings/team-league-standings.component';
import { TeamLeagueSelectorComponent } from './team-dashboard/team-schedule/team-league-selector/team-league-selector.component';
import { TeamScheduleViewModeComponent } from './team-dashboard/team-schedule/team-schedule-view-mode/team-schedule-view-mode.component';
import { TeamGameListComponent } from './team-dashboard/team-schedule/team-game-list/team-game-list.component';
import { TeamInviteComponent } from './team-invite/team-invite.component';
import { TeamRosterComponent } from './team-dashboard/team-roster/team-roster.component';
import { TeamInviteService } from './team-invite/team-invite.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamComponent,
    TeamDashboardComponent,
    TeamSidebarComponent,
    TeamFeedComponent,
    UserCardComponent,
    TeamScheduleComponent,
    TeamSelectedGameComponent,
    TeamLeagueStandingsComponent,
    TeamLeagueSelectorComponent,
    TeamScheduleViewModeComponent,
    TeamGameListComponent,
    TeamInviteComponent,
    TeamRosterComponent
  ],
  entryComponents: [
    TeamInviteComponent, 
    UserCardComponent
  ],
  providers: [TeamInviteService]
})
export class TeamModule { }
