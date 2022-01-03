import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { BasicAuthHtppInterceptorService } from 'projects/insite-kit/src/service/http-interceptor/basic-auth-htpp-interceptor.service';
import { AppRoutingModule } from '../app-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditVacationsComponent } from './edit-vacations/edit-vacations.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VacationFormComponent } from './vacation-form/vacation-form.component';

@NgModule({
  declarations: [
    UserFormComponent,
    VacationFormComponent,
    AddUserComponent,
    EditVacationsComponent,
    EditUserComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  exports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    UserFormComponent,
    VacationFormComponent,
    AddUserComponent,
    EditUserComponent,
    EditVacationsComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
