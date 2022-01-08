import { formatDate, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { default as appJson } from 'projects/insite-kit/src/assets/translations/application/en.json';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
  VacationStatus,
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
  @ViewChild('deleteUserModal') deleteUserModal: ModalComponent;
  @ViewChild('addVacationModal') addVacationModal: ModalComponent;

  userData: User;
  vacationData: Vacation[];
  applications: string[] = [];
  userJson = json;
  vacationEditRoute: string;
  loading = true;
  outputEventColumns = ['id'];
  excludedColumns = ['id', 'userId', 'insertDate'];
  columns = ['startDate', 'endDate', 'status'];
  form: FormGroup;
  modalLoading = false;
  canEdit = false;

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
    private readonly location: Location,
    private readonly fb: FormBuilder,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.buildForm();
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res)),
        tap(
          () =>
            (this.canEdit = this.userService.canEditUser(this.userData.webRole))
        ),
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

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.formChange();
  }

  formChange() {
    this.form.controls.startDate.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate: this.vacationChange(v) })
    );
  }

  vacationChange(value: string) {
    if (value.trim() === '') {
      return '';
    }

    const endDate = new Date(value);
    endDate.setDate(endDate.getDate() + 8);
    return formatDate(endDate, 'yyyy-MM-dd', 'en-US');
  }

  setApplications(apps: Application[]) {
    const translations = Object.values(appJson)[0];
    apps
      .filter((v) => v.access)
      .forEach((v) => this.applications.push(translations[v.name]));
  }

  onUserEditClick() {
    this.router.navigate([`/user/${this.userData.id}/details/edit/info`]);
  }

  onVacationEditClick() {
    this.router.navigate([`/user/${this.userData.id}/details/vacations/edit`]);
  }

  deleteModal() {
    this.deleteUserModal.open();
  }

  onResetPassword() {
    this.router.navigate([`/user/${this.userData.id}/details/reset-password`]);
  }

  onDeleteUser() {
    this.deleteUserModal.close();
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

  onShowAllClick() {
    this.router.navigate([`/user/${this.userData.id}/details/vacations`]);
  }

  onBackClick() {
    this.location.back();
  }

  onAddVacation() {
    this.modalLoading = true;
    this.vacationService
      .createVacation(this.userData.id, {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        status: VacationStatus.APPROVED,
      })
      .pipe(
        switchMap(() =>
          this.vacationService.getVacationsByUserId(this.userData.id)
        )
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.vacationData = res;
          this.addVacationModal.close();
          this.toastService.success('Vacation sucessfully added!');
        },
        (err) => {
          this.loading = false;
          this.addVacationModal.close();
          this.toastService.success(
            'Vacation could not be added. Please try again later.'
          );
        }
      );
  }

  onRowClick(event: any) {
    if (this.canEdit) {
      this.router.navigate([
        `/user/${this.userData.id}/details/vacations/${event.id}/details`,
      ]);
    }
  }
}
