import { Pipe, PipeTransform } from '@angular/core';
import { Notification } from '../../models/notification.model';

@Pipe({ name: 'formatNotitication' })
export class NotificationMessagePipe implements PipeTransform {
  transform(notification: Notification) {
    if (notification) {
      const stringNotification = notification.type.toString().toLowerCase();
      return `New ${stringNotification[0].toUpperCase()}${stringNotification.substring(
        1
      )} Request`;
    } else {
      return 'New Request';
    }
  }
}
