import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${event.title} ${formatDate(
      event.start,
      'h:mm a',
      this.locale
    )} - ${formatDate(event.end, 'h:mm a', this.locale)}</b> `;
  }

  week(event: CalendarEvent): string {
    return `<b>${event.title}</br> ${formatDate(
      event.start,
      'h:mm a',
      this.locale
    )} - ${formatDate(event.end, 'h:mm a', this.locale)}</b> `;
  }

  day(event: CalendarEvent): string {
    return `<b>${event.title}</br> ${formatDate(
      event.start,
      'h:mm a',
      this.locale
    )} - ${formatDate(event.end, 'h:mm a', this.locale)}</b> `;
  }
}
