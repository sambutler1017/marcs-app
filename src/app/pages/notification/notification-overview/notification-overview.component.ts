import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { SubscriptionService } from 'projects/insite-kit/src/service/stomp/subscription.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification-overview',
  templateUrl: './notification-overview.component.html',
  styleUrls: ['./notification-overview.component.scss'],
})
export class NotificationOverviewComponent implements OnInit, OnDestroy {
  private readonly GENERAL_SOCKET_URL = '/topic/general/notification';
  private readonly USER_SOCKET_URL = '/queue/user/notification';

  @ViewChild('notificationGrid') notificationGrid: GridComponent;

  dataLoader: any;
  destroy = new Subject<void>();

  constructor(
    public notificationService: NotificationService,
    private readonly jwt: JwtService,
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.dataLoader = (params: any) => this.getNotifications(this.getParams());
  }

  ngOnInit() {
    this.listenToGeneral();
    this.listenToUser();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  listenToGeneral() {
    this.subscriptionService
      .listen(this.GENERAL_SOCKET_URL)
      .pipe(
        switchMap(() => this.getNotifications(this.getParams())),
        takeUntil(this.destroy)
      )
      .subscribe((res) => this.notificationGrid.refresh());
  }

  listenToUser() {
    this.subscriptionService
      .listen(this.USER_SOCKET_URL, true)
      .pipe(
        switchMap(() => this.getNotifications(this.getParams())),
        takeUntil(this.destroy)
      )
      .subscribe((res) => this.notificationGrid.refresh());
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
