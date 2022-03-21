import { formatDate } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { VacationService } from 'src/service/vacation-service/vacation.service';
import { AddUserVacationModalComponent } from '../../modals/add-user-vacation-modal/add-user-vacation-modal.component';

@Component({
  selector: 'app-user-vacations-card',
  templateUrl: './user-vacations-card.component.html',
  styleUrls: ['./user-vacations-card.component.scss'],
})
export class UserVacationsCardComponent implements OnInit, OnDestroy {
  @ViewChild(AddUserVacationModalComponent)
  addVacationModalComponent: AddUserVacationModalComponent;
  @Input() canEdit: boolean = false;

  vacationDataLoader: Vacation[];
  userId: number;
  vacationEditRoute: string;
  hasFeatureAccess = false;

  Feature = Feature;
  Application = App;
  Access = Access;
  destroy = new Subject();

  constructor(
    private readonly vacationService: VacationService,
    private readonly activeRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    console.log(this.canEdit);
    this.activeRoute.params
      .pipe(
        tap((p) => (this.userId = p.id)),
        switchMap(() =>
          this.authService.hasAccess(
            App.USER,
            Feature.USER_VACATION,
            Access.READ
          )
        ),
        tap((res) => (this.hasFeatureAccess = res)),
        switchMap(() => this.vacationService.getVacationsByUserId(this.userId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.vacationDataLoader = res));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onVacationSave(event: any) {
    this.vacationDataLoader = event;
  }

  vacationChange(value: string) {
    if (value.trim() === '') {
      return '';
    }

    const endDate = new Date(value);
    endDate.setDate(endDate.getDate() + 8);
    return formatDate(endDate, 'yyyy-MM-dd', 'en-US');
  }

  onVacationEditClick() {
    this.router.navigate([`/user/${this.userId}/details/vacations/edit`]);
  }

  onShowAllClick() {
    this.router.navigate([`/user/${this.userId}/details/vacations`]);
  }

  onRowClick(event: any) {
    if (this.canEdit) {
      this.router.navigate([
        `/user/${this.userId}/details/vacations/${event.id}/details`,
      ]);
    }
  }
}
