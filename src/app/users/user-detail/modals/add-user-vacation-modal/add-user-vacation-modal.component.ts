import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { VacationStatus } from 'projects/insite-kit/src/models/common.model';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-add-user-vacation-modal',
  templateUrl: './add-user-vacation-modal.component.html',
  styleUrls: ['./add-user-vacation-modal.component.scss'],
})
export class AddUserVacationModalComponent implements OnInit {
  @ViewChild('addVacationModal') modal: ModalComponent;
  @Input() userId: number;
  @Output() save = new EventEmitter<any>();

  form: FormGroup;
  modalLoading = false;
  destroy = new Subject<void>();

  constructor(
    private readonly vacationService: VacationService,
    private readonly toastService: ToastrService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      notes: null,
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

  onAddVacation() {
    this.modalLoading = true;
    this.vacationService
      .createVacation(this.userId, {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        status: VacationStatus.APPROVED,
        notes: this.form.value.notes,
      })
      .pipe(
        switchMap(() => this.vacationService.getVacationsByUserId(this.userId))
      )
      .subscribe(
        (res) => {
          this.modalLoading = false;
          this.save.emit(res);
          this.modal.close();
          this.toastService.success('Vacation sucessfully added!');
        },
        (err) => {
          this.modalLoading = false;
          this.modal.close();
          this.toastService.success(
            'Vacation could not be added. Please try again later.'
          );
        }
      );
  }
}
