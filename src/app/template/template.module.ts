import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template.component';
import { NavComponent } from './header/nav/nav.component';
import { SearchComponent } from './header/nav/search/search.component';
import { NavHomeComponent } from './header/nav/nav-home/nav-home.component';
import { NavLeaguesComponent } from './header/nav/nav-leagues/nav-leagues.component';
import { NavTeamsComponent } from './header/nav/nav-teams/nav-teams.component';
import { NavAdminComponent } from './header/nav/nav-admin/nav-admin.component';
import { NavUserComponent } from './header/nav/nav-user/nav-user.component';
import { LoadingComponent } from './loading/loading.component';
import { NotificationModule } from './header/notification/notification.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TemplateComponent,
    NavComponent,
    SearchComponent,
    NavHomeComponent,
    NavLeaguesComponent,
    NavTeamsComponent,
    NavAdminComponent,
    NavUserComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NotificationModule
  ],
  exports: [
    TemplateComponent
  ],
  entryComponents: [
    LoadingComponent,
    NavComponent
  ]
})
export class TemplateModule { }
