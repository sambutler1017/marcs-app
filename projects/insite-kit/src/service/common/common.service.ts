import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  copyObject(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  formatDate(value: Date | string) {
    if (value === null) {
      return '-';
    }
    let dateValue;
    if (value instanceof Date) {
      dateValue = value;
    } else {
      dateValue = new Date(value);
    }

    const month =
      dateValue.getMonth() + 1 < 10
        ? `0${dateValue.getMonth() + 1}`
        : dateValue.getMonth() + 1;
    const day =
      dateValue.getDate() < 10
        ? `0${dateValue.getDate()}`
        : dateValue.getDate();
    const year = dateValue.getFullYear();

    return `${month}/${day}/${year}`;
  }
}
