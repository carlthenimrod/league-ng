import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template.component';
import { NavComponent } from './header/nav/nav.component';
import { UserNotificationsComponent } from './header/user-notifications/user-notifications.component';
import { SearchComponent } from './header/nav/search/search.component';
import { NavHomeComponent } from './header/nav/nav-home/nav-home.component';
import { NavLeaguesComponent } from './header/nav/nav-leagues/nav-leagues.component';
import { NavTeamsComponent } from './header/nav/nav-teams/nav-teams.component';
import { NavAdminComponent } from './header/nav/nav-admin/nav-admin.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    TemplateComponent, 
    NavComponent,
    UserNotificationsComponent,
    SearchComponent,
    NavHomeComponent,
    NavLeaguesComponent,
    NavTeamsComponent,
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    TemplateComponent
  ],
  entryComponents: [
    NavComponent,
    UserNotificationsComponent
  ]
})
export class TemplateModule { }
