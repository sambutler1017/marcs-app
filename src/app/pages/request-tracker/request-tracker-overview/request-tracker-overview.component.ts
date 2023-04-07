import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { RequestTrackerGridComponent } from 'src/app/shared/grids/request-tracker-grid/request-tracker-grid.component';
import { VacationService } from 'src/service/vacation-service/vacation.service';
@Component({
  selector: 'app-request-tracker-overview',
  templateUrl: './request-tracker-overview.component.html',
  styleUrls: ['./request-tracker-overview.component.scss'],
})
export class RequestTrackerOverviewComponent {
  @ViewChild('vacationModal') requestModal: ModalComponent;
  @ViewChild('vacationDetailsModal') vacationDetailsModal: ModalComponent;
  @ViewChild(RequestTrackerGridComponent)
  requestTrackerGrid: RequestTrackerGridComponent;

  dataLoader: any;
  vacationInfo: Vacation;
  vacationInfoModalLoading = false;

  constructor(
    private readonly vacationService: VacationService,
    private readonly router: Router
  ) {
    this.dataLoader = () => this.getCurrentUserVacationsDataloader();
  }

  getCurrentUserVacationsDataloader() {
    return this.vacationService.getCurrentUserVacations();
  }

  onRequestWizard() {
    this.router.navigate(['/request-tracker/wizard']);
  }

  handleRowClick(event: any) {
    this.vacationDetailsModal.open();
    this.vacationInfo = event;
  }
}
