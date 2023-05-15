import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulerOverviewComponent } from './scheduler-overview/scheduler-overview.component';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerOverviewComponent, SchedulerComponent],
  imports: [
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class SchedulerModule {}
