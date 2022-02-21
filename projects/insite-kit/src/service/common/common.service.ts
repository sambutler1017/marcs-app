import { Injectable } from '@angular/core';
import { default as applicationsJson } from 'projects/insite-kit/src/assets/translations/applications/en.json';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
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

  getApplicationList(apps: any[]) {
    const applications = [];
    const translations = Object.values(applicationsJson)[0];

    if (apps.length <= 0) {
      return [];
    }

    if (apps[0].name) {
      apps
        .filter((v) => v.access)
        .forEach((v) => applications.push(translations[v.name ? v.name : v]));
    } else {
      apps.forEach((v) => applications.push(translations[v.name ? v.name : v]));
    }

    return applications;
  }
}
