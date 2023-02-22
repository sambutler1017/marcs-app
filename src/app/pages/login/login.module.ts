import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginOverviewComponent } from './login-overview/login-overview.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginOverviewComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
    ForgotPasswordResetComponent,
  ],
  imports: [SharedModule],
})
export class LoginModule {}
