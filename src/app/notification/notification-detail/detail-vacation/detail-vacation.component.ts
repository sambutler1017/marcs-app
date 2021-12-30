import { Component, Input } from '@angular/core';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';

@Component({
  selector: 'app-detail-vacation',
  templateUrl: './detail-vacation.component.html',
})
export class NotificationDetailVactionComponent {
  @Input() vacationData: Vacation;
}
