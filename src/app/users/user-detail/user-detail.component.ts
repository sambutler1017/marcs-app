import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { default as appJson } from 'projects/insite-kit/src/assets/translations/application/en.json';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { Application, User } from 'projects/insite-kit/src/models/user.model';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @ViewChild('deleteUserModal') deleteUserModal: ModalComponent;
  @ViewChild('addVacationModal') addVacationModal: ModalComponent;
  @ViewChild(GridComponent) grid: GridComponent;

  userData: User;
  applications: string[] = [];
  userJson = json;
  loading = true;
  canEdit = false;

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;
  destroy = new Subject();

  constructor(
    private readonly userService: UserService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    private readonly location: Location
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res)),
        tap(
          () =>
            (this.canEdit = this.userService.canEditUser(this.userData.webRole))
        ),
        switchMap(() => this.userService.getUserAppsById(this.userData.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.setApplications(res);
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
    this.router.navigate([`/user/${this.userData.id}/details/edit/info`]);
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
}
