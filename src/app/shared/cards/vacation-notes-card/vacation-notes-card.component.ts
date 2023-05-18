import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-vacation-notes-card',
  templateUrl: './vacation-notes-card.component.html',
  styleUrls: ['./vacation-notes-card.component.scss'],
})
export class VacationNotesCardComponent implements OnInit, OnDestroy {
  @ViewChild('notesModal') notesModal: ModalComponent;
  @Input() cardTitle = 'Notes';
  @Input() data: Vacation;
  destroy = new Subject<void>();
  form: FormGroup;

  WebRole = WebRole;
  Feature = AppFeature;
  Access = Access;
  VacationStatus = VacationStatus;
  editIcon = faPenToSquare;

  notesModalLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly vacationService: VacationService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      notes: this.data.notes ? this.data.notes : '',
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onSaveNotes() {
    this.notesModalLoading = true;
    this.vacationService
      .updateVacationInfo(this.data.id, { notes: this.form.value.notes })
      .subscribe({
        next: (res) => {
          this.notesModalLoading = false;
          this.notesModal.close();
          this.data = res;
          this.popupService.success('Vacation notes successfully updated!');
        },
        error: () => {
          this.notesModalLoading = false;
          this.notesModal.close();
          this.popupService.success(
            'Vacation notes could not be updated at this time. Please try again later.'
          );
        },
      });
  }
}
