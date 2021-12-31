import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/notifications/en.json';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
@Component({
  selector: 'app-notification-overview',
  templateUrl: './notification-overview.component.html',
  styleUrls: ['./notification-overview.component.scss'],
})
export class NotificationOverviewComponent extends BaseComponent
  implements OnInit {
  notificationJson = json;
  outputEventColumns = ['id'];
  excludedColumns = ['id', 'read', 'receiverId'];
  columns = ['type', 'linkId', 'insertDate'];
  dataLoader: Notification[];

  constructor(
    public notificationService: NotificationService,
    private readonly jwt: JwtService,
    private readonly router: Router
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.getNotifications(this.getParams()).subscribe((res) => {
      this.dataLoader = res;
      this.triggerNotificationUpdate();
    });
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
