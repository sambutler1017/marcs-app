import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-user-vacations-detail',
  templateUrl: './user-vacations-detail.component.html',
})
export class UserVacationsDetailComponent implements OnInit, OnDestroy {
  @ViewChild('deleteVacationModal') deleteVacationModal: ModalComponent;

  destroy = new Subject();
  vacationId: number;
  vacationData: Vacation;
  loading = false;
  notesModalLoading = false;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly vacationService: VacationService,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((p) => (this.vacationId = p.vacId)),
        switchMap(() => this.vacationService.getVacationById(this.vacationId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.vacationData = res));
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
    this.vacationService.deleteVacationById(this.vacationId).subscribe(
      (res) => {
        this.loading = false;
        this.deleteVacationModal.close();
        this.toastService.success('Vacation sucessfully deleted!');
        this.location.back();
      },
      (err) => {
        this.loading = false;
        this.deleteVacationModal.close();
        this.toastService.success(
          'Vacation could not be deleted. Try again later.'
        );
      }
    );
  }
}
