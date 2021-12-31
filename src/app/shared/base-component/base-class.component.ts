import { Component } from '@angular/core';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';

@Component({
  selector: 'app-edit-user',
  template: '',
})
export class BaseComponent {
  constructor(public notificationService: NotificationService) {}

  triggerNotificationUpdate() {
    this.notificationService.triggerNotificationUpdate();
  }
}
