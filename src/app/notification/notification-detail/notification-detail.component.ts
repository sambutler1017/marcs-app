import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
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
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { iif, of, Subject } from 'rxjs';
import { concatMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';
import { NotificationDetailUserComponent } from './detail-user/detail-user.component';
import { NotificationDetailVactionComponent } from './detail-vacation/detail-vacation.component';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) requestModal: ModalComponent;
  @ViewChild(NotificationDetailUserComponent)
  notificationUserDetail: NotificationDetailUserComponent;
  @ViewChild(NotificationDetailVactionComponent)
  notificationVacationDetail: NotificationDetailVactionComponent;

  destroy = new Subject<void>();
  activeNotification: Notification;
  notificationData: User | Vacation;
  form: FormGroup;
  modalLoading = false;

  NotificationType = NotificationType;
  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly vacationService: VacationService,
    private readonly notificationService: NotificationService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
    this.activeRoute.params
      .pipe(
        concatMap((res) =>
          this.notificationService.getNotificationById(res.id)
        ),
        tap((res) => (this.activeNotification = res.body)),
        concatMap(() => this.markNotification()),
        concatMap(() => this.getNotificationData()),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.notificationData = res;
        this.notificationService.triggerNotificationUpdate();
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
    this.requestModal.open();
  }

  buildForm() {
    this.form = this.fb.group({
      notes: '',
    });
  }

  onRequestDecision(status: string) {
    this.modalLoading = true;
    this.processRequest(status)
      .pipe(
        switchMap(() =>
          this.notificationService.deleteNotification(
            this.activeNotification.id
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: () => {
          this.closeModal();
          this.router.navigate(['/notification/overview']);
          this.popupService.success(`Request has been successfully ${status}`);
        },
        error: () => {
          this.closeModal();
          this.popupService.error(
            'Request can not be reviewed at this time. Try again later.'
          );
        },
      });
  }

  processRequest(status: string) {
    if (this.activeNotification.type === NotificationType.USER) {
      return this.notificationUserDetail.process(status);
    } else {
      return this.notificationVacationDetail.process(
        status,
        this.form.value.notes
      );
    }
  }

  closeModal() {
    this.modalLoading = false;
    this.requestModal.close();
  }

  onBackClick() {
    this.router.navigate(['/notification']);
  }
}
