import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { DeleteUserModalComponent } from './modals/delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @ViewChild(DeleteUserModalComponent)
  deleteUserModal: DeleteUserModalComponent;
  @ViewChild(GridComponent) grid: GridComponent;

  userData: User;
  applications: string[];
  loading = true;
  canEdit = false;

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;
  Number = Number;
  destroy = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly activeRoute: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res)),
        switchMap(() => this.userService.getUserAppsById(this.userData.id)),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: (res) => {
          this.applications = this.commonService.getApplicationList(res);
          this.canEdit = this.userService.canEditUser(this.userData.webRole);
          this.loading = false;
        },
        error: () => {
          this.onBackClick();
          this.popupService.error(
            'Could not load user details at this time. Try again later.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onUserEditClick() {
    this.router.navigate([`/user/${this.userData.id}/details/edit/info`]);
  }

  onResetPassword() {
    this.router.navigate([`/user/${this.userData.id}/details/reset-password`]);
  }

  onBackClick() {
    this.router.navigate(['/user/overview']);
  }
}
