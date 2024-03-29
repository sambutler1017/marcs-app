import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { ModalService } from 'projects/insite-kit/src/components/modal/modal.service';
import {
  Access,
  Application,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userData: User;
  vacationData: Vacation[];
  userJson = json;
  vacationEditRoute: string;
  loading = true;

  excludedColumns = ['id', 'userId', 'insertDate'];
  columns = ['startDate', 'endDate', 'status'];

  WebRole = WebRole;
  Feature = Feature;
  Application = Application;
  Access = Access;
  destroy = new Subject();

  constructor(
    private readonly userService: UserService,
    private readonly vacationService: VacationService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res)),
        switchMap((res) => this.vacationService.getVacationsByUserId(res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.vacationData = res;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onMoveClick() {
    this.router.navigate(['/user/move-manager']);
  }

  onManageEditClick() {
    this.router.navigate([`/user/details/${this.userData.id}/edit/info`]);
  }

  onVacationEditClick() {
    this.router.navigate([`/user/details/${this.userData.id}/edit/vacations`]);
  }

  deleteModal() {
    this.modalService.open();
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
