import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { RequestTrackerGridComponent } from 'src/app/shared/grids/request-tracker-grid/request-tracker-grid.component';
import { VacationService } from 'src/service/vacation-service/vacation.service';
@Component({
  selector: 'app-request-tracker-overview',
  templateUrl: './request-tracker-overview.component.html',
  styleUrls: ['./request-tracker-overview.component.scss'],
})
export class RequestTrackerOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('vacationModal') requestModal: ModalComponent;
  @ViewChild('vacationDetailsModal') vacationDetailsModal: ModalComponent;
  @ViewChild(RequestTrackerGridComponent)
  requestTrackerGrid: RequestTrackerGridComponent;

  loading = false;
  dataLoader: any;
  destroy = new Subject<void>();
  form: FormGroup;
  vacationInfo: Vacation;
  vacationInfoModalLoading = false;

  constructor(
    private readonly vacationService: VacationService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService
  ) {
    this.dataLoader = () => this.getCurrentUserVacationsDataloader();
  }

  ngOnInit() {
    this.buildForm();
  }

  getCurrentUserVacationsDataloader() {
    return this.vacationService.getCurrentUserVacations();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      notes: [''],
    });

    this.formChange();
  }

  formChange() {
    this.form.controls.startDate.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate: this.vacationChange(v) })
    );
  }

  vacationChange(value: string) {
    if (value.trim() === '') {
      return '';
    }

    const endDate = new Date(value);
    endDate.setDate(endDate.getDate() + 8);
    return formatDate(endDate, 'yyyy-MM-dd', 'en-US');
  }

  onCreateRequest() {
    this.loading = true;
    const vacationRequest = {
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      notes: this.form.value.notes.trim() !== '' ? this.form.value.notes : null,
    };

    this.vacationService
      .requestVacation(vacationRequest)
      .pipe(
        switchMap(() => this.vacationService.getCurrentUserVacations()),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: (res) => {
          this.dataLoader = res;
          this.requestModal.close();
          this.loading = false;
          this.popupService.success('Vacation Request sucessfully sent!');
        },
        error: () => {
          this.requestModal.close();
          this.loading = false;
          this.popupService.error(
            'Vacation Request could not be sent. Please try again later.'
          );
        },
      });
  }

  handleRowClick(event: any) {
    this.vacationDetailsModal.open();
    this.vacationInfo = event;
  }
}
