import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../../projects/insite-kit/src/service/auth-service/auth.guard';
import { AppComponent } from './app.component';
import { BlockDatesComponent } from './block-dates/block-dates.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { SharedModule } from './shared/shared.module';
import { StoresDetailComponent } from './stores/store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores/stores-overview/stores-overview.component';
import { StoresComponent } from './stores/stores.component';
import { UserModule } from './users/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    StoresComponent,
    CalendarComponent,
    BlockDatesComponent,
    MapComponent,
    ReportsComponent,
    RequestTrackerComponent,
    ContactComponent,
    StoresOverviewComponent,
    StoresDetailComponent,
    ProfileComponent,
    CalendarOverviewComponent,
    CalendarHeaderComponent,
  ],
  imports: [
    SharedModule,
    UserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
