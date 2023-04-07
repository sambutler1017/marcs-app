import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { VacationService } from 'src/service/vacation-service/vacation.service';
@Component({
  selector: 'app-request-tracker-vacation-modal',
  templateUrl: './request-tracker-vacation-modal.component.html',
  styleUrls: ['./request-tracker-vacation-modal.component.scss'],
})
export class RequestTrackerVacationModalComponent implements OnInit, OnDestroy {
  @ViewChild('vacationModal') requestModal: ModalComponent;

  loading = false;
  destroy = new Subject<void>();
  form: FormGroup;
  vacationInfo: Vacation;

  constructor(
    private readonly vacationService: VacationService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

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
        next: () => {
          this.requestModal.close();
          this.loading = false;
          this.popupService.success('Vacation Request sucessfully sent!');
          this.router.navigate(['/request-tracker']);
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
}
