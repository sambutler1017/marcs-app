import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-vacations',
  templateUrl: './user-vacations.component.html',
})
export class UserVacationsComponent extends BaseComponent
  implements OnInit, OnDestroy {
  destroy = new Subject();
  dataLoader: Vacation[];
  user: User;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vacationService: VacationService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly location: Location,
    public readonly notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((p) => this.userService.getUserById(p.id)),
        tap((user) => (this.user = user)),
        switchMap((user) => this.vacationService.getVacationsByUserId(user.id)),
        takeUntil(this.destroy)
      )
      .subscribe((vacs) => {
        this.dataLoader = vacs;
        this.triggerNotificationUpdate();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.location.back();
  }

  onVacationClick(event: any) {
    this.router.navigate([
      `user/${this.user.id}/details/vacations/${event.id}/details`,
    ]);
  }
}
