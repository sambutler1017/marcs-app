import { NgModule } from '@angular/core';
import { AuthGuard } from '../../projects/insite-kit/src/service/auth-service/auth.guard';
import { AppComponent } from './app.component';
import { BlockDatesModule } from './block-dates/block-dates.module';
import { CalendarManagerModule } from './calendar/calendar.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { ReportsModule } from './reports/reports.module';
import { RequestTrackerModule } from './request-tracker/request-tracker.module';
import { SharedModule } from './shared/shared.module';
import { StoresModule } from './stores/stores.module';
import { UserModule } from './users/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    LoginModule,
    StoresModule,
    UserModule,
    RequestTrackerModule,
    NotificationModule,
    CalendarManagerModule,
    ProfileModule,
    BlockDatesModule,
    HomeModule,
    ReportsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
