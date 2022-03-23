import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ik-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
})
export class NotificationBarComponent {
  notificationVisible: boolean = false;

  triggerNotification() {
    this.closeNotification();
    of(this.notificationVisible)
      .pipe(delay(500))
      .subscribe(() => (this.notificationVisible = true));
  }

  closeNotification() {
    this.notificationVisible = false;
  }

  toggleNotitication() {
    this.notificationVisible = !this.notificationVisible;
  }

  onNotificationRouteClick() {
    this.closeNotification();
  }
}
