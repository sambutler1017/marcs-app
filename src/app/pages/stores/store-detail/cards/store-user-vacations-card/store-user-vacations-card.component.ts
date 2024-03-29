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
    this.userVacationsDataloader = (params: any) =>
      this.getUserVacationsDataloader(params);
  }

  getUserVacationsDataloader(params?: Map<string, string[]>) {
    return this.vacationService.getVacations(
      params
        .set('storeId', [this.store.id])
        .set('status', [VacationStatus.APPROVED])
    );
  }
}
