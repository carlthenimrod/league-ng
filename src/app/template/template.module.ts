import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template.component';
import { UserNotificationsComponent } from './header/user-notifications/user-notifications.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    TemplateComponent, UserNotificationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TemplateComponent
  ],
  entryComponents: [
    UserNotificationsComponent
  ]
})
export class TemplateModule { }