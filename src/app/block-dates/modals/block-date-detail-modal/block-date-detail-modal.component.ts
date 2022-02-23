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
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Subject } from 'rxjs';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';
import { DeleteBlockOutDateModalComponent } from '../delete-block-out-date-modal/delete-block-out-date-modal.component';

@Component({
  selector: 'app-block-date-detail-modal',
  templateUrl: './block-date-detail-modal.component.html',
  styleUrls: ['./block-date-detail-modal.component.scss'],
})
export class BlockDateDetailModalComponent implements OnInit {
  @ViewChild('blockOutDateDetailModal') modal: ModalComponent;
  @ViewChild(DeleteBlockOutDateModalComponent)
  deleteModal: DeleteBlockOutDateModalComponent;
  @Input() blockDate: BlockOutDate;
  @Input() userCreated: User;
  @Input() loading = true;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  destroy = new Subject();

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly fb: FormBuilder,
    private readonly blockDatesService: BlockDatesService,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  updateForm() {
    this.form.patchValue({
      startDate: this.blockDate.startDate,
      endDate: this.blockDate.endDate,
    });
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

  onBlockOutDateDelete() {
    this.deleteModal.modal.open();
    this.modal.close();
  }

  onDeleteBlockDateComplete() {
    this.delete.emit();
  }

  onBlockOutDateUpdate() {
    this.blockDatesService
      .updateBlockOutDateById(this.blockDate.id, {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
      })
      .subscribe(
        () => {
          this.modal.close();
          this.toastService.success('Block out date successfully updated!');
          this.update.emit();
        },
        (err) => {
          this.modal.close();
          this.toastService.error(
            'Could not update block out date at this time!'
          );
        }
      );
  }
}
