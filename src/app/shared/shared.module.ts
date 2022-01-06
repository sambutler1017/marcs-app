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
import { RequestTrackerGridComponent } from './request-tracker-grid/request-tracker-grid.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VacationDetailsCardComponent } from './vacation-cards/vacation-details-card/vacation-details-card.component';
import { VacationNotesCardComponent } from './vacation-cards/vacation-notes-card/vacation-notes-card.component';
import { VacationModalComponent } from './vacation-modal/vacation-modal.component';

@NgModule({
  declarations: [
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    RequestTrackerGridComponent,
    VacationDetailsCardComponent,
    VacationNotesCardComponent,
    VacationModalComponent,
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
    AddUserComponent,
    EditUserComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    RequestTrackerGridComponent,
    VacationDetailsCardComponent,
    VacationNotesCardComponent,
    VacationModalComponent,
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
