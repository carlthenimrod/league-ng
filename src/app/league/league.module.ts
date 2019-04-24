import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { LeagueStandingsComponent } from './league-standings/league-standings.component';
import { LeagueScheduleComponent } from './league-schedule/league-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    LeagueRoutingModule
  ],
  declarations: [
    LeagueComponent,
    LeagueStandingsComponent,
    LeagueScheduleComponent
  ]
})
export class LeagueModule { }
