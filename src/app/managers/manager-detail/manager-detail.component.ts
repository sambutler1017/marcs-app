import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';
import {
  Access,
  Application,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/lib/models/common.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { Vacation } from 'projects/insite-kit/src/lib/models/vacation.model';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-manager-detail',
  templateUrl: './manager-detail.component.html',
})
export class ManagerDetailComponent implements OnInit, OnDestroy {
  userData: User;
  vacationData: Vacation[];
  managerJson = json;
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
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap(res => this.userService.getUserById(res.id)),
      tap(res => this.userData = res),
      switchMap(res => this.vacationService.getVacationsByUserId(res.id)),
      takeUntil(this.destroy))
      .subscribe(res => this.vacationData = res);
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onMoveClick() {
    this.router.navigate(['/managers/move-manager']);
  }

  onManageEditClick() {
    this.router.navigate([`/manager/details/${this.userData.id}/edit/info`]);
  }

  onVacationEditClick() {
    this.router.navigate([`/manager/details/${this.userData.id}/edit/vacations`]);
  }

  onRowClick(event: any) { }
}
