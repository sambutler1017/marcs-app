import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';

@Component({
  selector: 'app-add-block-out-date-modal',
  templateUrl: './add-block-out-date-modal.component.html',
  styleUrls: ['./add-block-out-date-modal.component.scss'],
})
export class AddBlockOutDateModalComponent implements OnInit {
  @ViewChild('addBlockOutDateModal') modal: ModalComponent;
  @Output() save = new EventEmitter<any>();

  loading: boolean;
  form: FormGroup;
  destroy = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly blockDatesService: BlockDatesService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = false;
    this.buildForm();
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

  onBlockOutDateCreate() {
    this.loading = true;
    this.blockDatesService
      .createBlockOutDate({
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
      })
      .subscribe({
        next: () => {
          this.modal.close();
          this.loading = false;
          this.save.emit();
          this.popupService.success('Block out date successfully updated!');
        },
        error: () => {
          this.modal.close();
          this.loading = false;
          this.popupService.error(
            'Could not update block out date at this time!'
          );
        },
      });
  }
}
