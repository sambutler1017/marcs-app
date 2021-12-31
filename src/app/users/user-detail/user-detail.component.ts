import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { default as appJson } from 'projects/insite-kit/src/assets/translations/application/en.json';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { ModalService } from 'projects/insite-kit/src/components/modal/modal.service';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { Application, User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent extends BaseComponent
  implements OnInit, OnDestroy {
  userData: User;
  vacationData: Vacation[];
  applications: string[] = [];
  userJson = json;
  vacationEditRoute: string;
  loading = true;

  excludedColumns = ['id', 'userId', 'insertDate'];
  columns = ['startDate', 'endDate', 'status'];

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;
  destroy = new Subject();

  constructor(
    private readonly userService: UserService,
    private readonly vacationService: VacationService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    public modalService: ModalService,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res)),
        switchMap(() =>
          this.vacationService.getVacationsByUserId(this.userData.id)
        ),
        tap((res) => (this.vacationData = res)),
        switchMap(() => this.userService.getUserAppsById(this.userData.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.setApplications(res);
        this.triggerNotificationUpdate();
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  setApplications(apps: Application[]) {
    const translations = Object.values(appJson)[0];
    apps
      .filter((v) => v.access)
      .forEach((v) => this.applications.push(translations[v.name]));
  }

  onUserEditClick() {
    this.router.navigate([`/user/details/${this.userData.id}/edit/info`]);
  }

  onVacationEditClick() {
    this.router.navigate([`/user/details/${this.userData.id}/edit/vacations`]);
  }

  deleteModal() {
    this.modalService.open();
  }

  onResetPassword() {
    this.router.navigate([`/user/details/${this.userData.id}/reset-password`]);
  }

  onDeleteUser() {
    this.modalService.close();
    this.loading = true;
    this.userService.deleteUser(this.userData.id).subscribe(
      () => {
        this.toastService.success('User successfully deleted!');
        this.router.navigate(['/user']);
      },
      (err) =>
        this.toastService.success('User could not be deleted at this time!')
    );
  }

  onRowClick(event: any) {}
}
