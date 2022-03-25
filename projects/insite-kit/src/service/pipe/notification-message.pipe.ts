import { Pipe, PipeTransform } from '@angular/core';
import {
  Notification,
  NotificationType,
} from '../../models/notification.model';

@Pipe({ name: 'formatNotitication' })
export class NotificationMessagePipe implements PipeTransform {
  transform(notification: Notification) {
    if (notification) {
      return NotificationType[notification.type];
    } else {
      return 'New Request';
    }
  }
}
