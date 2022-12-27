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
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
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
  destroy = new Subject<void>();
  canEdit = false;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly fb: FormBuilder,
    private readonly blockDatesService: BlockDatesService,
    private readonly popupService: PopupService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .hasAccess(App.BLOCK_DATES, Feature.BLOCK_DATES_OVERVIEW, Access.UPDATE)
      .subscribe((res) => {
        this.canEdit = res;
        console.log('User can edit:', this.canEdit);
      });
    this.buildForm();
  }

  updateForm() {
    this.form.patchValue({
      startDate: this.blockDate.startDate.toString().split('T')[0],
      endDate: this.blockDate.endDate.toString().split('T')[0],
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
    this.form.reset();
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
    this.loading = true;
    this.blockDatesService
      .updateBlockOutDateById(this.blockDate.id, {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
      })
      .subscribe({
        next: () => {
          this.modal.close();
          this.form.reset();
          this.popupService.success('Block out date successfully updated!');
          this.update.emit();
        },
        error: () => {
          this.modal.close();
          this.popupService.error(
            'Could not update block out date at this time!'
          );
        },
      });
  }
}
