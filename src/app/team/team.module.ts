import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamFeedComponent } from './team-dashboard/team-feed/team-feed.component';
import { UserCardComponent } from './team-roster/user-card/user-card.component';
import { TeamScheduleComponent } from './team-dashboard/team-schedule/team-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamComponent,
    TeamDashboardComponent,
    TeamRosterComponent,
    TeamFeedComponent,
    UserCardComponent,
    TeamScheduleComponent
  ],
  entryComponents: [UserCardComponent]
})
export class TeamModule { }
