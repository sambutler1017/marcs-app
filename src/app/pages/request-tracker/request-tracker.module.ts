import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestTrackerOverviewComponent } from './request-tracker-overview/request-tracker-overview.component';
import { RequestTrackerVacationModalComponent } from './request-tracker-wizard/request-tracker-vacation-modal/request-tracker-vacation-modal.component';
import { RequestTrackerWizardComponent } from './request-tracker-wizard/request-tracker-wizard.component';
import { RequestTrackerComponent } from './request-tracker.component';

@NgModule({
  declarations: [
    RequestTrackerComponent,
    RequestTrackerOverviewComponent,
    RequestTrackerWizardComponent,
    RequestTrackerVacationModalComponent,
  ],
  imports: [SharedModule],
})
export class RequestTrackerModule {}
