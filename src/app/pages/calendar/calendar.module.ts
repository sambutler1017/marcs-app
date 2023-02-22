import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    CalendarOverviewComponent,
    CalendarHeaderComponent,
    CalendarComponent,
  ],
  imports: [
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class CalendarManagerModule {}
