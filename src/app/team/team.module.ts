import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CalendarModule } from '@app/calendar/calendar.module';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamFeedComponent } from './team-dashboard/team-feed/team-feed.component';
import { UserCardComponent } from './team-roster/user-card/user-card.component';
import { TeamScheduleComponent } from './team-dashboard/team-schedule/team-schedule.component';
import { TeamNavComponent } from './team-nav/team-nav.component';
import { TeamSelectedGameComponent } from './team-dashboard/team-schedule/team-selected-game/team-selected-game.component';
import { TeamLeagueStandingsComponent } from './team-dashboard/team-schedule/team-league-standings/team-league-standings.component';
import { TeamLeagueSelectorComponent } from './team-dashboard/team-schedule/team-league-selector/team-league-selector.component';
import { TeamScheduleViewModeComponent } from './team-dashboard/team-schedule/team-schedule-view-mode/team-schedule-view-mode.component';
import { TeamGameListComponent } from './team-dashboard/team-schedule/team-game-list/team-game-list.component';

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
    TeamRosterComponent,
    TeamFeedComponent,
    UserCardComponent,
    TeamScheduleComponent,
    TeamNavComponent,
    TeamSelectedGameComponent,
    TeamLeagueStandingsComponent,
    TeamLeagueSelectorComponent,
    TeamScheduleViewModeComponent,
    TeamGameListComponent
  ],
  entryComponents: [UserCardComponent]
})
export class TeamModule { }
