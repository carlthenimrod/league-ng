import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template.component';
import { LoadingComponent } from './loading/loading.component';
import { NavModule } from './header/nav/nav.module';
import { NotificationModule } from './header/notification/notification.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    TemplateComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NavModule,
    NotificationModule
  ],
  exports: [
    TemplateComponent
  ],
  entryComponents: [
    LoadingComponent
  ]
})
export class TemplateModule { }
