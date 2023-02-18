import { Component, Input } from '@angular/core';
import { VacationStatus } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-store-user-vacations-card',
  templateUrl: './store-user-vacations-card.component.html',
})
export class StoreUserVacationsCardComponent {
  @Input() store: Store;

  userVacationsDataloader: any;

  constructor(private readonly vacationService: VacationService) {
    this.userVacationsDataloader = (params) =>
      this.getUserVacationsDataloader();
  }

  getUserVacationsDataloader() {
    return this.vacationService.getVacations(
      new Map<string, string[]>()
        .set('storeId', [this.store.id])
        .set('status', [VacationStatus.APPROVED])
    );
  }
}
