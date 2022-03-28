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
import { UserApplicationAccessCardComponent } from './cards/user-application-access-card/user-application-access-card.component';
import { UserDetailsCardComponent } from './cards/user-details-card/user-details-card.component';
import { VacationDetailsCardComponent } from './cards/vacation-details-card/vacation-details-card.component';
import { VacationNotesCardComponent } from './cards/vacation-notes-card/vacation-notes-card.component';
import { StoreFormComponent } from './forms/store-form/store-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { RequestTrackerGridComponent } from './grids/request-tracker-grid/request-tracker-grid.component';
import { VacationModalComponent } from './modals/vacation-modal/vacation-modal.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

@NgModule({
  declarations: [
    UserFormComponent,
    RequestTrackerGridComponent,
    VacationDetailsCardComponent,
    VacationNotesCardComponent,
    VacationModalComponent,
    StoreFormComponent,
    UserDetailsCardComponent,
    UserApplicationAccessCardComponent,
    UpdatePasswordComponent,
    ResetPasswordComponent,
    EditUserComponent,
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
    RequestTrackerGridComponent,
    VacationDetailsCardComponent,
    VacationNotesCardComponent,
    VacationModalComponent,
    StoreFormComponent,
    UserApplicationAccessCardComponent,
    UserDetailsCardComponent,
    UpdatePasswordComponent,
    ResetPasswordComponent,
    EditUserComponent,
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
