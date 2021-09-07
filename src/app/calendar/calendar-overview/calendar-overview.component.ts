import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
})
export class CalendarOverviewComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Samuel Butler',
    },
    {
      start: startOfDay(new Date()),
      title: 'Billy B',
    },
    {
      start: startOfDay(new Date()),
      title: 'Test User',
    },
  ];

  ngOnInit() {
    this.events[0].start.setHours(this.events[0].start.getHours());
    this.events[1].start.setHours(this.events[1].start.getHours() + 1);
    this.events[2].start.setHours(this.events[2].start.getHours() + 2);
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
