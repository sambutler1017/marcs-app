import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {
  addHours,
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay,
} from 'date-fns';
import { Subject } from 'rxjs';
import { CustomEventTitleFormatter } from './custom-date.formatter';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-scheduler-overview',
  templateUrl: './scheduler-overview.component.html',
  styleUrls: ['./scheduler-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class SchedulerOverviewComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 6),
      end: addHours(addHours(startOfDay(new Date()), 6), 6),
      title: 'Billy Joe',
      color: colors.red,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(addHours(startOfDay(new Date()), 7), 6),
      title: 'Shawn Parker',
      color: colors.red,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(new Date()), 6),
      end: addHours(addHours(startOfDay(new Date()), 6), 6),
      title: 'Pete Hart',
      color: colors.red,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(new Date()), 6),
      end: addHours(addHours(startOfDay(new Date()), 6), 6),
      title: 'Kathy Dave',
      color: colors.red,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(addHours(startOfDay(new Date()), 6), 6),
      end: addHours(addHours(addHours(startOfDay(new Date()), 6), 6), 6),
      title: 'Jane Test',
      color: colors.blue,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(addHours(addHours(startOfDay(new Date()), 6), 6), 6),
      end: addHours(
        addHours(addHours(addHours(startOfDay(new Date()), 6), 6), 5),
        6
      ),
      title: 'Bob Butler',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;
  formGroup: any;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      scheduleName: ['', Validators.required],
      store: ['38KC', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
