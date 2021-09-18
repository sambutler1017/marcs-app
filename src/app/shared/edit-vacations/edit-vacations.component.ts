import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { VacationService } from 'src/service/vacation-service/vacation.service';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';

@Component({
  selector: 'app-edit-vacations',
  templateUrl: './edit-vacations.component.html',
  styleUrls: ['./edit-vacations.component.scss'],
})
export class EditVacationsComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  destroy = new Subject();
  updatingVacations: Vacation[];
  userId: number;

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private vacationService: VacationService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((p) => Number(p.id)),
        tap((id) => (this.userId = id)),
        switchMap((id) => this.vacationService.getVacationsByUserId(id)),
        takeUntil(this.destroy)
      )
      .subscribe((vacations) => {
        this.loading = false;
        this.updatingVacations = vacations;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(vacations: Vacation[]) {
    this.loading = true;
    vacations.forEach((v) => (v.userId = this.userId));

    this.vacationService
      .deleteAllVacationsByUserId(this.userId)
      .pipe(
        switchMap(() =>
          this.vacationService.createBatchVacations(this.userId, vacations)
        ),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res) => {
          this.toastService.success('User Vacations Successfully Updated!');
          this.onCancelClick();
        },
        () =>
          this.toastService.error(
            'Could not update vacations! Try again later.'
          )
      );
  }
}
