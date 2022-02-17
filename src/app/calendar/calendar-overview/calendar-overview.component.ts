import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { of, Subject } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';
import { CustomDateFormatter } from './custom-date.formatter';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarOverviewComponent extends BaseComponent
  implements OnInit, OnDestroy {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];
  loading = true;
  destroy = new Subject();

  constructor(
    private readonly vacationService: VacationService,
    private readonly userService: UserService,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.loading = true;
    this.getVacations().subscribe((res) => {
      this.mapEvents(res);
      this.triggerNotificationUpdate();
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  onViewChange(value: CalendarView) {
    this.view = value;
  }

  onViewDateChange(value: Date) {
    this.viewDate = value;
  }

  dayClicked(value: any) {
    this.viewDate = value.date;
    this.view = CalendarView.Day;
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const dayOfMonth = day.date.getMonth();
      if (dayOfMonth === 11) {
        day.cssClass = 'block-day-icon';
      }
    });
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  getVacations() {
    let params = this.userService.getUserAccessMap();

    if (params) {
      return this.vacationService.getVacations(params);
    } else {
      return this.vacationService.getVacations();
    }
  }

  getUserProfiles(userIds: number[]) {
    if (userIds.length === 0) {
      return of([]);
    }

    return this.userService.getUsers(
      new Map<string, string[]>().set(
        'id',
        userIds.map((id) => id.toString())
      )
    );
  }

  mapEvents(vacations: Vacation[]) {
    let hourCount = this.getHourCountTracker();

    vacations.forEach((v) => {
      const dateString = v.startDate
        .toString()
        .split('-')
        .map((v) => Number(v));

      const startDate = startOfDay(
        new Date(dateString[0], dateString[1] - 1, dateString[2])
      );

      startDate.setHours(
        hourCount[dateString[0].toString()][dateString[1]][dateString[2]]
      );

      this.events.push({
        start: startDate,
        title: `${v.fullName} (${v.storeId})`,
        meta: { vacation: v },
      });
      hourCount[dateString[0].toString()][dateString[1]][dateString[2]]++;
    });
  }

  getHourCountTracker() {
    const currentYear = new Date().getFullYear();
    let hourCount: any = {};

    hourCount[(currentYear - 1).toString()] = new Array(13)
      .fill(0)
      .map(() => new Array(31).fill(0));
    hourCount[currentYear.toString()] = new Array(13)
      .fill(0)
      .map(() => new Array(31).fill(0));
    hourCount[(currentYear + 1).toString()] = new Array(13)
      .fill(0)
      .map(() => new Array(31).fill(0));

    return hourCount;
  }
}
