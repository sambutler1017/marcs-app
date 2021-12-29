import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Notification,
  NotificationType,
} from 'projects/insite-kit/src/models/notification.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { iif, Subject } from 'rxjs';
import { concatMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit, OnDestroy {
  destroy = new Subject();
  activeNotification: Notification;
  notificationData: User | Vacation;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly vacationService: VacationService
  ) {}

  ngOnInit() {
    this.activeRoute.data
      .pipe(
        tap((data) => (this.activeNotification = data.notification)),
        concatMap(() =>
          iif(
            () => this.activeNotification.type === NotificationType.USER,
            this.userService.getUserById(this.activeNotification.linkId),
            this.vacationService.getVacationById(this.activeNotification.linkId)
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.notificationData = res;
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
