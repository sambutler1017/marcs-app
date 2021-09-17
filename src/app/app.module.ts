import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../../projects/insite-kit/src/components/login/login.component';
import { AuthGuard } from '../../projects/insite-kit/src/service/auth-service/auth.guard';
import { AppComponent } from './app.component';
import { BlockDatesComponent } from './block-dates/block-dates.component';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { EditInfoComponent } from './managers/edit-info/edit-info.component';
import { EditVacationsComponent } from './managers/edit-vacations/edit-vacations.component';
import { ManagersComponent } from './managers/managers.component';
import { ManagersModule } from './managers/managers.module';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { SharedModule } from './shared/shared.module';
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
    EditInfoComponent,
    EditVacationsComponent,
    StoresOverviewComponent,
    StoresDetailComponent,
    ProfileComponent,
    CalendarOverviewComponent,
  ],
  imports: [
    SharedModule,
    ManagersModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
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
