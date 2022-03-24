import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '@stomp/stompjs';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { StompWebSocketService } from 'projects/insite-kit/src/service/stomp/stomp-websocket.service';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification-overview',
  templateUrl: './notification-overview.component.html',
  styleUrls: ['./notification-overview.component.scss'],
})
export class NotificationOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('notificationGrid') notificationGrid: GridComponent;

  dataLoader: Notification[];
  destroy = new Subject();

  constructor(
    public notificationService: NotificationService,
    private readonly jwt: JwtService,
    private readonly router: Router,
    private readonly stompService: StompWebSocketService
  ) {}

  ngOnInit() {
    this.getNotifications(this.getParams()).subscribe(
      (res) => (this.dataLoader = res)
    );

    this.stompService
      .watch('/notifications')
      .pipe(
        map((res: Message) => JSON.parse(res.body)),
        filter((res: Notification) => this.isNotificationReceiver(res)),
        switchMap(() => this.getNotifications(this.getParams())),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.notificationGrid.refresh();
        this.dataLoader = res;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
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

  isNotificationReceiver(res: Notification) {
    return (
      this.jwt.getRequiredUserId() === res.receiverId ||
      WebRole[this.jwt.getRequiredWebRole()] === WebRole.ADMIN
    );
  }
}
