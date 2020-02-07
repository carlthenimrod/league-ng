import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    EmailConfirmComponent,
    LogoutComponent,
    PasswordRecoveryComponent
  ]
})
export class CoreModule { }
