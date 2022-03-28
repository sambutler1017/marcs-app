import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
@Component({
  selector: 'app-vacation-modal',
  templateUrl: './vacation-modal.component.html',
  styleUrls: ['./vacation-modal.component.scss'],
})
export class VacationModalComponent {
  @ViewChild(ModalComponent) vacationDetailsModal: ModalComponent;
  @Input() vacationData: Vacation;

  open() {
    this.vacationDetailsModal.open();
  }

  close() {
    this.vacationDetailsModal.close();
  }
}
