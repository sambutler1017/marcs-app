import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { RequestTrackerGridComponent } from 'src/app/shared/request-tracker-grid/request-tracker-grid.component';
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
  dataLoader: Observable<Vacation[]>;
  destroy = new Subject();
  form: FormGroup;
  vacationInfo: Vacation;
  vacationInfoModalLoading = false;

  constructor(
    private readonly vacationService: VacationService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastrService
  ) {
    this.dataLoader = this.vacationService.getCurrentUserVacations();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
    };

    this.vacationService
      .requestVacation(vacationRequest)
      .pipe(
        switchMap(() => this.vacationService.getCurrentUserVacations()),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res) => {
          this.requestTrackerGrid.grid.refresh();

          this.requestModal.close();
          this.loading = false;
          this.toastService.success('Vacation Request sucessfully sent!');
        },
        (err) => {
          this.requestModal.close();
          this.loading = false;
          this.toastService.error(
            'Vacation Request could not be sent. Please try again later.'
          );
        }
      );
  }

  handleRowClick(event: any) {
    this.vacationInfoModalLoading = true;
    this.vacationDetailsModal.open();
    this.vacationService.getVacationById(event.id).subscribe((res) => {
      this.vacationInfo = res;
      this.vacationInfoModalLoading = false;
    });
  }
}
