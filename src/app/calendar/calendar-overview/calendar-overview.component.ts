import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { combineLatest } from 'rxjs';
import { VacationModalComponent } from 'src/app/shared/modals/vacation-modal/vacation-modal.component';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';
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
export class CalendarOverviewComponent implements OnInit {
  @ViewChild(VacationModalComponent) vacationModal: VacationModalComponent;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];
  blockDates: BlockOutDate[];
  vacationClicked: Vacation;
  loading = true;
  canEdit = false;

  constructor(
    private readonly vacationService: VacationService,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
    private readonly blockDateService: BlockDatesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    combineLatest([
      this.getVacations(),
      this.blockDateService.getBlockOutDates(),
      this.authService.hasAccess(App.USER, Feature.USER_VACATION, Access.READ),
    ]).subscribe(([userVacs, blockDates, access]) => {
      this.mapUserEvents(userVacs);
      this.blockDates = blockDates;
      this.canEdit = access;
      this.loading = false;
    });
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

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent) {
    renderEvent.body.forEach((day) => {
      if (this.isBlockOutDate(day.date)) {
        day.cssClass = 'block-day-icon';
      }
    });
  }

  eventClicked({ event }: { event: CalendarEvent }) {
    this.vacationClicked = event.meta.vacation;
    if (
      this.canEdit &&
      this.userService.canEditUser(this.vacationClicked.webRole)
    ) {
      this.vacationModal.open();
    }
  }

  isBlockOutDate(day: Date) {
    let isBlockDate = false;

    this.blockDates.every((bDate) => {
      if (
        this.blockDateService.isDateBetween(
          this.commonService.convertStringToDate(
            bDate.startDate.toString().split('T')[0]
          ),
          day,
          this.commonService.convertStringToDate(
            bDate.endDate.toString().split('T')[0]
          )
        )
      ) {
        isBlockDate = true;
        return;
      }
      return true;
    });
    return isBlockDate;
  }

  getVacations() {
    let params = this.userService.getUserAccessMap();

    if (params) {
      return this.vacationService.getVacations(params);
    } else {
      return this.vacationService.getVacations();
    }
  }

  mapUserEvents(vacations: Vacation[]) {
    let hourCount = this.getHourCountTracker();

    vacations.forEach((v) => {
      const dateString = v.startDate
        .toString()
        .split('T')[0]
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
