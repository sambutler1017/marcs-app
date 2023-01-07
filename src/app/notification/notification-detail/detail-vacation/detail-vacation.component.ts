import { Component, Input } from '@angular/core';
import { VacationStatus } from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-detail-vacation',
  templateUrl: './detail-vacation.component.html',
})
export class NotificationDetailVactionComponent {
  @Input() vacationData: Vacation;

  constructor(private readonly vacationService: VacationService) {}

  process(status: string, notes: string) {
    const type =
      status === 'APPROVED' ? VacationStatus.APPROVED : VacationStatus.DENIED;

    return this.vacationService.updateVacationInfo(this.vacationData.id, {
      status: type,
      notes: notes.trim() === '' ? this.vacationData.notes : null,
    });
  }
}
