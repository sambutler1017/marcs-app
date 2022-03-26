import { Component, Input, OnInit } from '@angular/core';
import { VacationStatus } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-store-user-vacations-card',
  templateUrl: './store-user-vacations-card.component.html',
})
export class StoreUserVacationsCardComponent implements OnInit {
  @Input() store: Store;

  userVacations: Vacation[];
  loading = true;

  constructor(private readonly vacationService: VacationService) {}

  ngOnInit() {
    this.loading = true;
    this.vacationService
      .getVacations(
        new Map<string, string[]>()
          .set('storeId', [this.store.id])
          .set('status', [VacationStatus.APPROVED])
      )
      .subscribe((res) => {
        this.userVacations = res;
        this.loading = false;
      });
  }
}
