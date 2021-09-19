import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userData: User;
  vacationData: Vacation[];
  userJson = json;
  vacationEditRoute: string;

  excludedColumns = ['id', 'userId', 'insertDate'];

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
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res)),
        switchMap((res) => this.vacationService.getVacationsByUserId(res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.vacationData = res));
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
  }

  onRowClick(event: any) {}
}
