import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import {
  Notification,
  NotificationType,
} from 'projects/insite-kit/src/models/notification.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { iif, of, Subject } from 'rxjs';
import { concatMap, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent extends BaseComponent
  implements OnInit, OnDestroy {
  destroy = new Subject();
  activeNotification: Notification;
  notificationData: User | Vacation;

  NotificationType = NotificationType;
  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly vacationService: VacationService,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        concatMap((res) =>
          this.notificationService.getNotificationById(res.id)
        ),
        tap((res) => (this.activeNotification = res)),
        concatMap(() => this.markNotification()),
        concatMap(() => this.getNotificationData()),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.notificationData = res;
        this.triggerNotificationUpdate();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  markNotification() {
    return iif(
      () => this.activeNotification.read,
      of(null),
      this.notificationService.markNotificationRead(this.activeNotification.id)
    );
  }

  getNotificationData() {
    return iif(
      () => this.activeNotification.type === NotificationType.USER,
      this.userService.getUserById(this.activeNotification.linkId),
      this.vacationService.getVacationById(this.activeNotification.linkId)
    );
  }

  onReviewRequest() {
    console.log('Review Clicked');
  }
}
