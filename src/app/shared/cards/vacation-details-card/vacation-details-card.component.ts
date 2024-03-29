import { formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  AppFeature,
  VacationStatus,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { VacationService } from 'src/service/vacation-service/vacation.service';
@Component({
  selector: 'app-vacation-details-card',
  templateUrl: './vacation-details-card.component.html',
  styleUrls: ['./vacation-details-card.component.scss'],
})
export class VacationDetailsCardComponent implements OnChanges, OnDestroy {
  @Input() data: Vacation;
  @ViewChild(ModalComponent) vacationEditModal: ModalComponent;

  loading = false;
  form: FormGroup;
  destroy = new Subject<void>();

  VacationStatus = VacationStatus;
  WebRole = WebRole;
  Feature = AppFeature;
  Access = Access;
  editIcon = faPenToSquare;

  constructor(
    private readonly vacationService: VacationService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService
  ) {}

  ngOnChanges() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      startDate: [
        this.data?.startDate.toString().split('T')[0],
        Validators.required,
      ],
      endDate: [
        this.data?.endDate.toString().split('T')[0],
        Validators.required,
      ],
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

  ngOnDestroy() {
    this.destroy.next();
  }

  onSaveVacation() {
    this.loading = true;

    this.vacationService
      .updateVacationDatesById(this.data.id, {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
      })
      .subscribe({
        next: (res) => {
          this.updateCard(res);
          this.popupService.success('Vacation successfully updated!');
        },
        error: () =>
          this.popupService.error(
            'Could not update vaction at this time. Try again later.'
          ),
      });
  }

  onDenyVacation() {
    this.loading = true;

    this.vacationService
      .updateVacationInfo(this.data.id, {
        status: VacationStatus.DENIED,
      })
      .subscribe((res) => this.updateCard(res));
  }

  onApproveVacation() {
    this.loading = true;

    this.vacationService
      .updateVacationInfo(this.data.id, {
        status: VacationStatus.APPROVED,
      })
      .subscribe((res) => this.updateCard(res));
  }

  updateCard(newData: Vacation) {
    this.data = newData;
    this.buildForm();
    this.loading = false;
    this.vacationEditModal.close();
  }
}
