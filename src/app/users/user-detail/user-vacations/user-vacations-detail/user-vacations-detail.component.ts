import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-vacations-detail',
  templateUrl: './user-vacations-detail.component.html',
})
export class UserVacationsDetailComponent implements OnInit, OnDestroy {
  @ViewChild('deleteVacationModal') deleteVacationModal: ModalComponent;

  destroy = new Subject<void>();
  vacationId: number;
  vacationData: Vacation;
  loading = false;
  notesModalLoading = false;
  blockOutDateConflict: BlockOutDate;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly vacationService: VacationService,
    private readonly blockDatesService: BlockDatesService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((p) => (this.vacationId = p.vacId)),
        switchMap(() => this.vacationService.getVacationById(this.vacationId)),
        tap((res) => (this.vacationData = res)),
        switchMap(() =>
          this.blockDatesService.isBlockOutDate(
            this.vacationData.startDate,
            this.vacationData.endDate
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.blockOutDateConflict = res));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onBackClick() {
    this.location.back();
  }

  onOpenDeleteModal() {
    this.deleteVacationModal.open();
  }

  onDeleteVacation() {
    this.loading = true;
    this.vacationService.deleteVacationById(this.vacationId).subscribe({
      next: () => {
        this.loading = false;
        this.deleteVacationModal.close();
        this.popupService.success('Vacation sucessfully deleted!');
        this.location.back();
      },
      error: () => {
        this.loading = false;
        this.deleteVacationModal.close();
        this.popupService.success(
          'Vacation could not be deleted. Try again later.'
        );
      },
    });
  }
}
