import { Component, Input, OnInit } from '@angular/core';
import {
  Access,
  App,
  Feature,
  VacationStatus,
} from 'projects/insite-kit/src/models/common.model';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { Subject } from 'rxjs';
import { VacationService } from 'src/service/vacation-service/vacation.service';

@Component({
  selector: 'app-store-user-vacations-card',
  templateUrl: './store-user-vacations-card.component.html',
})
export class StoreUserVacationsCardComponent implements OnInit {
  @Input() storeId: string;

  userVacations: Vacation[];
  loading = true;
  destroy = new Subject();

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(private readonly vacationService: VacationService) {}

  ngOnInit() {
    this.loading = true;
    this.vacationService
      .getVacations(
        new Map<string, string[]>()
          .set('storeId', [this.storeId])
          .set('status', [VacationStatus.APPROVED])
      )
      .subscribe((res) => {
        this.userVacations = res;
        this.loading = false;
      });
  }
}
