import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-notification-overview',
  templateUrl: './notification-overview.component.html',
  styleUrls: ['./notification-overview.component.scss'],
})
export class NotificationOverviewComponent {
  dataLoader: Observable<Notification[]>;

  constructor(
    public notificationService: NotificationService,
    private readonly jwt: JwtService,
    private readonly router: Router
  ) {
    this.dataLoader = this.getNotifications(this.getParams());
  }

  getNotifications(params?: Map<string, string[]>) {
    return this.notificationService.getNotifications(params);
  }

  gridRowClick(event: any) {
    this.router.navigate([`/notification/details/${event.id}`]);
  }

  getParams() {
    const currentUserRole = WebRole[this.jwt.get('webRole')];

    if (Number(currentUserRole) >= WebRole.SITE_ADMIN.valueOf()) {
      return new Map<string, string[]>();
    } else {
      return new Map().set('receiverId', this.jwt.get('userId'));
    }
  }
}
