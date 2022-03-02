import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
  VacationStatus,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
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
  destroy = new Subject();
  form: FormGroup;

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;
  VacationStatus = VacationStatus;

  notesModalLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly vacationService: VacationService,
    private readonly toastService: ToastrService
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
      .subscribe(
        (res) => {
          this.notesModalLoading = false;
          this.notesModal.close();
          this.data = res;
          this.toastService.success('Vacation notes successfully updated!');
        },
        (err) => {
          this.notesModalLoading = false;
          this.notesModal.close();
          this.toastService.success(
            'Vacation notes could not be updated at this time. Please try again later.'
          );
        }
      );
  }
}
