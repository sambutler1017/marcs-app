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
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
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
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.userData = res;
        this.canEdit = this.userService.canEditUser(res.webRole);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onResetPassword() {
    this.router.navigate([`/user/${this.userData.id}/details/reset-password`]);
  }

  onBackClick() {
    this.router.navigate(['/user/overview']);
  }
}
