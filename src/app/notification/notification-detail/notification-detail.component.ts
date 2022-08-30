import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
  VacationStatus,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import {
  Notification,
  NotificationType,
} from 'projects/insite-kit/src/models/notification.model';
import { AccountStatus, User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { iif, Observable, of, Subject } from 'rxjs';
import { concatMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) requestModal: ModalComponent;

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
    public notificationService: NotificationService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
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
    const observableRequest: Observable<any> =
      status === 'APPROVED' ? this.onRequestApproved() : this.onRequestDenied();
    observableRequest
      .pipe(
        switchMap(() =>
          this.notificationService.deleteNotification(
            this.activeNotification.id
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res) => {
          this.modalLoading = false;
          this.requestModal.close();
          this.router.navigate(['/notification/overview']);
          this.toastService.success(`Request has been successfully ${status}`);
        },
        (err) => {
          this.modalLoading = false;
          this.requestModal.close();
          this.toastService.error(
            'Request can not be reviewed at this time. Try again later.'
          );
        }
      );
  }

  onRequestApproved() {
    if (this.activeNotification.type === NotificationType.USER) {
      return this.userService.updateUserStatus(this.notificationData.id, {
        accountStatus: AccountStatus.APPROVED,
        appAccess: true,
      });
    } else {
      return this.vacationService.updateVacationInfo(this.notificationData.id, {
        status: VacationStatus.APPROVED,
        notes: this.form.value.notes,
      });
    }
  }

  onRequestDenied() {
    if (this.activeNotification.type === NotificationType.USER) {
      return this.userService
        .updateUserStatus(this.notificationData.id, {
          accountStatus: AccountStatus.DENIED,
          appAccess: false,
        })
        .pipe(
          switchMap(() => this.userService.deleteUser(this.notificationData.id))
        );
    } else {
      return this.vacationService.updateVacationInfo(this.notificationData.id, {
        status: VacationStatus.DENIED,
        notes:
          this.form.value.notes.trim() === ''
            ? this.notificationData.notes
            : null,
      });
    }
  }

  onBackClick() {
    this.router.navigate(['/notification']);
  }
}
