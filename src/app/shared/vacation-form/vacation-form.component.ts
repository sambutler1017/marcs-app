import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.scss'],
})
export class VacationFormComponent implements OnInit {
  @Input() vacationData: Vacation[];
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() loading = true;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Vacation[]>();

  form: FormGroup;
  WebRole = WebRole;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.loading = true;
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      startDate1:
        this.vacationData && this.vacationData[0]
          ? this.vacationData[0].startDate
          : '',
      endDate1:
        this.vacationData && this.vacationData[0]
          ? this.vacationData[0].endDate
          : '',
      startDate2:
        this.vacationData && this.vacationData[1]
          ? this.vacationData[1].startDate
          : '',
      endDate2:
        this.vacationData && this.vacationData[1]
          ? this.vacationData[1].endDate
          : '',
      startDate3:
        this.vacationData && this.vacationData[2]
          ? this.vacationData[2].startDate
          : '',
      endDate3:
        this.vacationData && this.vacationData[2]
          ? this.vacationData[2].endDate
          : '',
      startDate4:
        this.vacationData && this.vacationData[3]
          ? this.vacationData[3].startDate
          : '',
      endDate4:
        this.vacationData && this.vacationData[3]
          ? this.vacationData[3].endDate
          : '',
      startDate5:
        this.vacationData && this.vacationData[4]
          ? this.vacationData[4].startDate
          : '',
      endDate5:
        this.vacationData && this.vacationData[4]
          ? this.vacationData[4].endDate
          : '',
    });
    this.onFormChange();
    this.loading = false;
  }

  onFormChange() {
    this.form.controls.startDate1.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate1: this.vacationChange(v) })
    );
    this.form.controls.startDate2.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate2: this.vacationChange(v) })
    );
    this.form.controls.startDate3.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate3: this.vacationChange(v) })
    );
    this.form.controls.startDate4.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate4: this.vacationChange(v) })
    );
    this.form.controls.startDate5.valueChanges.subscribe((v) =>
      this.form.patchValue({ endDate5: this.vacationChange(v) })
    );
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    this.save.emit(this.formatVacations());
  }

  formatVacations() {
    const vacations: Vacation[] = [];
    if (this.form.value.startDate1 && this.form.value.endDate1) {
      vacations.push({
        startDate: this.form.value.startDate1,
        endDate: this.form.value.endDate1,
      });
    }

    if (this.form.value.startDate2 && this.form.value.endDate2) {
      vacations.push({
        startDate: this.form.value.startDate2,
        endDate: this.form.value.endDate2,
      });
    }

    if (this.form.value.startDate3 && this.form.value.endDate3) {
      vacations.push({
        startDate: this.form.value.startDate3,
        endDate: this.form.value.endDate3,
      });
    }

    if (this.form.value.startDate4 && this.form.value.endDate4) {
      vacations.push({
        startDate: this.form.value.startDate4,
        endDate: this.form.value.endDate4,
      });
    }

    if (this.form.value.startDate5 && this.form.value.endDate5) {
      vacations.push({
        startDate: this.form.value.startDate5,
        endDate: this.form.value.endDate5,
      });
    }
    return vacations;
  }

  vacationChange(value: string) {
    if (value.trim() === '') {
      return '';
    }

    const endDate = new Date(value);
    endDate.setDate(endDate.getDate() + 8);
    return formatDate(endDate, 'yyyy-MM-dd', 'en-US');
  }
}
