import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { NotificationType } from '../../models/notification.model';
import { WebNotification } from '../../models/web-notification.model';

@Component({
  selector: 'ik-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class NotificationMessageComponent {
  notifications: WebNotification[] = [];
  num = 0;

  onNotificationRouteClick() {}

  closeNotification() {}

  addNotification(type: NotificationType) {
    const stringNotification = type.toString().toLowerCase();
    const newNotificationMessage = {
      id: this.num++,
      title: `New ${stringNotification[0].toUpperCase()}${stringNotification.substring(
        1
      )} Request`,
      message: 'Just Now',
    };

    this.notifications = [...this.notifications, newNotificationMessage];
    setTimeout(() => {
      this.notifications = this.notifications.filter(
        (m) => m.id !== newNotificationMessage.id
      );
    }, 3000);
  }
}
