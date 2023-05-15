import { NgModule } from '@angular/core';
import { BlockDatesModule } from './block-dates/block-dates.module';
import { CalendarManagerModule } from './calendar/calendar.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { ReportsModule } from './reports/reports.module';
import { RequestTrackerModule } from './request-tracker/request-tracker.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { StoresModule } from './stores/stores.module';
import { UserModule } from './users/user.module';

@NgModule({
  imports: [
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
    SchedulerModule,
  ],
})
export class PagesModule {}
