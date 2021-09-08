import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { InsiteKitModule } from 'projects/insite-kit/src/lib/insite-kit.module';
import { BasicAuthHtppInterceptorService } from 'projects/insite-kit/src/lib/service/http-interceptor/basic-auth-htpp-interceptor.service';
import { LoginComponent } from '../../projects/insite-kit/src/lib/components/login/login.component';
import { AuthGuard } from '../../projects/insite-kit/src/lib/service/auth-service/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockDatesComponent } from './block-dates/block-dates.component';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AddManagerComponent } from './managers/add-manager/add-manager.component';
import { EditInfoComponent } from './managers/edit-info/edit-info.component';
import { EditVacationsComponent } from './managers/edit-vacations/edit-vacations.component';
import { ManagerDetailComponent } from './managers/manager-detail/manager-detail.component';
import { ManagerOverviewComponent } from './managers/manager-overview/manager-overview.component';
import { ManagersComponent } from './managers/managers.component';
import { MoveManagerComponent } from './managers/move-manager/move-manager.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { StoresDetailComponent } from './stores/store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores/stores-overview/stores-overview.component';
import { StoresComponent } from './stores/stores.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManagersComponent,
    StoresComponent,
    CalendarComponent,
    BlockDatesComponent,
    MapComponent,
    ReportsComponent,
    UsersComponent,
    RequestTrackerComponent,
    ContactComponent,
    ManagerOverviewComponent,
    ManagerDetailComponent,
    MoveManagerComponent,
    AddManagerComponent,
    EditInfoComponent,
    EditVacationsComponent,
    StoresOverviewComponent,
    StoresDetailComponent,
    ProfileComponent,
    CalendarOverviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },

    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
