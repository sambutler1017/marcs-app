import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-vacations',
  templateUrl: './user-vacations.component.html',
})
export class UserVacationsComponent implements OnInit, OnDestroy {
  @ViewChild('vacationModalDetails') vacationDetailsModal: ModalComponent;

  destroy = new Subject();
  dataLoader: Observable<Vacation[]>;
  user: User;
  selectedVacation: Vacation;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vacationService: VacationService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((p) => this.userService.getUserById(p.id)),
        tap((user) => (this.user = user)),
        tap(
          () =>
            (this.dataLoader = this.vacationService.getVacationsByUserId(
              this.user.id
            ))
        ),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.location.back();
  }

  onVacationClick(event: any) {
    if (this.userService.canEditUser(this.user.webRole)) {
      this.router.navigate([
        `user/${this.user.id}/details/vacations/${event.id}/details`,
      ]);
    } else {
      this.selectedVacation = event;
      this.vacationDetailsModal.open();
    }
  }
}
