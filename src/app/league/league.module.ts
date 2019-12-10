import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { LeagueStandingsComponent } from './league-standings/league-standings.component';
import { LeagueScheduleComponent } from './league-schedule/league-schedule.component';
import { LeagueHomeComponent } from './league-home/league-home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LeagueRoutingModule
  ],
  declarations: [
    LeagueComponent,
    LeagueStandingsComponent,
    LeagueScheduleComponent,
    LeagueHomeComponent
  ]
})
export class LeagueModule { }
